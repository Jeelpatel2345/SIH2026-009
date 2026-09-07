import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatCurrency(amount: number): string { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount); }
export function generateBookingCode(): string { return `SY-${Math.floor(1000 + Math.random() * 9000)}`; }
export function generateTransactionCode(): string { return `TX-${Math.floor(1000 + Math.random() * 9000)}`; }
export function getInitials(name: string): string { return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2); }
