/**
 * Authentication Helper
 * Because we need to check if you're actually admin or just pretending
 */

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getAuthUser() {
  try {
    const sessionCookie = (await cookies()).get('admin-session');
    
    if (!sessionCookie) {
      return null;
    }

    // Decode session token to get user ID
    const decoded = Buffer.from(sessionCookie.value, 'base64').toString();
    const userId = decoded.split(':')[0];

    // Verify user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getAuthUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}
