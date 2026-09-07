import { PrismaClient } from '@prisma/client';
import { allWorkers, serviceCategories } from '../src/data/workersData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with 6 categories & workers...');

  // Upsert all 6 service categories
  const categoryMap: Record<string, string> = {};
  for (const cat of serviceCategories) {
    const record = await prisma.serviceCategory.upsert({
      where: { name: cat.name },
      update: { partnerCount: cat.count, icon: cat.icon },
      create: { name: cat.name, icon: cat.icon, partnerCount: cat.count },
    });
    categoryMap[cat.name] = record.id;
  }

  // Admin user
  await prisma.user.upsert({
    where: { phone: '+919999999999' },
    update: {},
    create: {
      phone: '+919999999999',
      fullName: 'SahYog Admin',
      role: 'ADMIN',
      isVerified: true,
    },
  });

  // Seed workers into database
  for (const w of allWorkers.slice(0, 20)) {
    const workerUser = await prisma.user.upsert({
      where: { phone: w.phone },
      update: {},
      create: {
        phone: w.phone,
        fullName: w.name,
        role: 'WORKER',
        isVerified: true,
        workerProfile: {
          create: {
            primaryWorkArea: `${w.locality}, ${w.city}`,
            yearsExperience: w.exp,
            hourlyRate: w.rate,
            bio: w.bio,
            isOnline: true,
            isDocVerified: true,
            verificationStatus: 'APPROVED',
            rating: w.rating,
            totalJobs: w.reviewsCount,
            languages: w.languages.join(', '),
          },
        },
      },
      include: { workerProfile: true },
    });

    if (workerUser.workerProfile && categoryMap[w.category]) {
      await prisma.workerServiceCategory.upsert({
        where: {
          workerProfileId_serviceCategoryId: {
            workerProfileId: workerUser.workerProfile.id,
            serviceCategoryId: categoryMap[w.category],
          },
        },
        update: {},
        create: {
          workerProfileId: workerUser.workerProfile.id,
          serviceCategoryId: categoryMap[w.category],
        },
      });
    }
  }

  // Settings
  await prisma.platformSettings.upsert({
    where: { id: 'default-settings' },
    update: {},
    create: {
      id: 'default-settings',
      maintenanceMode: false,
      autoVerifyWorkers: true,
      commissionPercent: 15,
    },
  });

  console.log('✅ Seeding complete with 6 categories and verified workers!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
