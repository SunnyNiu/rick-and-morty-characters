import { cookies } from 'next/headers';
import { User } from '@/types/user';

export const APP_USER_COOKIE = 'app-user';

export const getUser = async (): Promise<User | undefined> => {
  const cookieStore = await cookies();
  const appUser = cookieStore.get(APP_USER_COOKIE)?.value;
  if (!appUser) {
    return;
  }
  const parsedUser = JSON.parse(appUser);
  return {
    username: parsedUser.username,
    jobTitle: parsedUser.jobTitle,
  };
};
