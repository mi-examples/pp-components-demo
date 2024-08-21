import { api } from '@/api/base';
import useSWR from 'swr';

export interface UserGroup {
  group_id: string;
  name: string;
  ldap_organizational_unit: string;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  is_administrator: 'Y' | 'N';
  is_power_user: 'Y' | 'N';
  is_manage_pages_privilege: 'Y' | 'N';
  groups: UserGroup[];
}

export interface UserInfo {
  resultCode: number;
  user: User;
}

async function getUser() {
  return api.get<UserInfo>('/data/page/index/auth/info', {
    baseURL: '/',
  }).then((response) => response.data.user);
}

export function useSWRUser() {
  return useSWR('/data/page/index/auth/info', getUser, {
    refreshInterval: 5 * 60 * 1000, // 5 minutes
  });
}
