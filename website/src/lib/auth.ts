import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'sahyog-trust-platform-secret-key-2026');
const COOKIE_NAME = 'sahyog-session';
export interface SessionPayload { userId: string; role: string; phone: string; language: string; }
export async function createToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(JWT_SECRET);
}
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try { const { payload } = await jwtVerify(token, JWT_SECRET); return payload as unknown as SessionPayload; } catch { return null; }
}
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies(); const token = cookieStore.get(COOKIE_NAME)?.value; if (!token) return null; return verifyToken(token);
}
export function setSessionCookie(token: string) {
  const cookieStore = cookies(); cookieStore.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60*60*24*7, path: '/' });
}
export function clearSessionCookie() { const cookieStore = cookies(); cookieStore.delete(COOKIE_NAME); }
export function generateOTP(): string { return '1234'; }
