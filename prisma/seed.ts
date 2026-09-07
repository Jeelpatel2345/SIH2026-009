import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Service categories
  const cleaning = await prisma.serviceCategory.upsert({
    where: { name: 'Cleaning' },
    update: {},
    create: { name: 'Cleaning', icon: 'Sparkles', partnerCount: 42 },
  });

  const plumbing = await prisma.serviceCategory.upsert({
    where: { name: 'Plumbing' },
    update: {},
    create: { name: 'Plumbing', icon: 'Wrench', partnerCount: 18 },
  });

  const electrician = await prisma.serviceCategory.upsert({
    where: { name: 'Electrician' },
    update: {},
    create: { name: 'Electrician', icon: 'Zap', partnerCount: 25 },
  });

  const repair = await prisma.serviceCategory.upsert({
    where: { name: 'Repair' },
    update: {},
    create: { name: 'Repair', icon: 'Hammer', partnerCount: 31 },
  });

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

  // Customer user
  const customer = await prisma.user.upsert({
    where: { phone: '+919876543210' },
    update: {},
    create: {
      phone: '+919876543210',
      fullName: 'Anjali Sharma',
      role: 'CUSTOMER',
      isVerified: true,
      customerProfile: {
        create: {
          address: 'B/402, Shanti Heights, Sector 12',
          city: 'Ahmedabad',
          state: 'Gujarat',
          pincode: '380015',
        },
      },
    },
  });

  // Worker user
  const workerUser = await prisma.user.upsert({
    where: { phone: '+919123456789' },
    update: {},
    create: {
      phone: '+919123456789',
      fullName: 'Rajesh Kumar',
      role: 'WORKER',
      isVerified: true,
      workerProfile: {
        create: {
          primaryWorkArea: 'Sector 14, Gurgaon',
          yearsExperience: 8,
          hourlyRate: 350,
          bio: 'Professional Electrician with 8+ years experience in wiring, MCB, inverter setup.',
          isOnline: true,
          isDocVerified: true,
          verificationStatus: 'APPROVED',
          rating: 4.8,
          totalJobs: 450,
          languages: 'English, Hindi, Gujarati',
        },
      },
    },
    include: { workerProfile: true },
  });

  if (workerUser.workerProfile) {
    // Add skills
    await prisma.workerSkill.createMany({
      data: [
        { workerProfileId: workerUser.workerProfile.id, skillName: 'Wiring' },
        { workerProfileId: workerUser.workerProfile.id, skillName: 'MCB Repair' },
        { workerProfileId: workerUser.workerProfile.id, skillName: 'Inverter Setup' },
        { workerProfileId: workerUser.workerProfile.id, skillName: 'AC Installation' },
        { workerProfileId: workerUser.workerProfile.id, skillName: 'LED Lighting' },
      ],
    });

    // Link category
    await prisma.workerServiceCategory.upsert({
      where: {
        workerProfileId_serviceCategoryId: {
          workerProfileId: workerUser.workerProfile.id,
          serviceCategoryId: electrician.id,
        },
      },
      update: {},
      create: {
        workerProfileId: workerUser.workerProfile.id,
        serviceCategoryId: electrician.id,
      },
    });

    // Create a demo booking
    await prisma.booking.create({
      data: {
        bookingCode: 'SY-9021',
        customerId: customer.id,
        workerProfileId: workerUser.workerProfile.id,
        serviceTitle: 'Plumbing Repair',
        scheduledDate: new Date(),
        scheduledTime: '10:30 AM',
        serviceLocation: 'Sector 45, Gurgaon',
        totalAmount: 650,
        status: 'IN_PROGRESS',
        workerOtp: '5821',
        trackingProgress: 65,
      },
    });
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

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
