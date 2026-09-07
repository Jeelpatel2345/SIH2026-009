'use client';
import { create } from 'zustand';
interface AuthState {
  isAuthenticated: boolean; userId: string | null; role: string | null; phone: string | null; fullName: string | null; language: string;
  setAuth: (data: { userId: string; role: string; phone: string; fullName?: string }) => void;
  setLanguage: (lang: string) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false, userId: null, role: null, phone: null, fullName: null, language: 'EN',
  setAuth: (data) => set({ isAuthenticated: true, userId: data.userId, role: data.role, phone: data.phone, fullName: data.fullName || null }),
  setLanguage: (lang) => set({ language: lang }),
  logout: () => set({ isAuthenticated: false, userId: null, role: null, phone: null, fullName: null }),
}));
