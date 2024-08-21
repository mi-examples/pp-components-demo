import { api } from '@/api/base';
import useSWR from 'swr';

export interface FolderElement {
  element_id: string;
  segment_value_id: string;
  favorite_id: string;
  element_dashboard_name: string;
  content_type: string;
  element_type: string;
  has_access: 'Y' | 'N';
  element_info: string;
  business_owner: string;
  business_owner_email: string;
  technical_owner: string;
  technical_owner_email: string;
  total_view_count: string;
  topics: string;
  certified_ind: 'Y' | 'N';
}

export interface FolderItem {
  folder_item_id: string;
  folder_id: string;
  element_id: string;
  segment_value_id: string;
  display_order: string;
}

async function apiGetFolderElements(opts?: { folderId?: string; folderName?: string }) {
  const { folderId, folderName } = opts || {};

  const searchParams = new URLSearchParams({});

  if (folderId) {
    searchParams.append('folder_id', folderId);
  }

  if (folderName) {
    searchParams.append('folder_name', folderName);
  }

  return api
    .get<{ folder_elements: FolderElement[]; folder_items: FolderItem[] }>(`/folder_element?${searchParams.toString()}`)
    .then((response) => response.data);
}

export function useSWRFolderElements(opts?: { folderId?: string; folderName?: string; skip: boolean }) {
  const { skip = false, ...rest } = opts || {};

  return useSWR(skip ? null : `/folder_element?${new URLSearchParams(rest || {}).toString()}`, () =>
    apiGetFolderElements(rest),
  );
}
