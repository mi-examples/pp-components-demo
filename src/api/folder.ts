import { api } from './base';
import useSWR from 'swr';

export interface Folder {
  folder_id: string;
  name: string;
  parent_folder_id: string | null;
}

async function apiGetFolders() {
  return api
    .get<{ folders: Folder[] }>('/folder')
    .then((response) => response.data)
    .then((data) => data.folders);
}

async function apiGetFolder(id: string) {
  return api
    .get<{ folder: Folder }>(`/folder/id/${id}`)
    .then((response) => response.data)
    .then((data) => data.folder);
}

export function useSWRFolders(skip = false) {
  return useSWR(skip ? null : '/folder', apiGetFolders);
}

export function useSWRFolder(id: string, skip = false) {
  return useSWR(skip ? null : `/folder/id/${id}`, () => apiGetFolder(id));
}
