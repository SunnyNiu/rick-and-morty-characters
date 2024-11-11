'use server';

import { User } from '@/types/user';
import { cookies } from 'next/headers';
import { APP_USER_COOKIE } from '@/libs/user';

type SetUserCookieResponse =
  | { success: true }
  | { success: false; message: string };

export const saveUser = async (user: User): Promise<SetUserCookieResponse> => {
  if (!user.username) {
    return { success: false, message: 'Username is required' };
  }
  if (!user.jobTitle) {
    return { success: false, message: 'Job title is required' };
  }

  const cookieStore = await cookies();
  cookieStore.set(APP_USER_COOKIE, JSON.stringify(user));
  return { success: true };
};
