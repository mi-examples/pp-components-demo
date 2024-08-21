import { Folder } from '@/api/folder';
import { SidebarItem } from '@metricinsights/pp-components';
import { FolderElement } from '@/api/folder-element';

export interface FolderExtended extends Folder {
  parent?: FolderExtended;
  childs?: FolderExtended[];
  elements: FolderElement[];
}

export function foldersToMap(folders: Folder[]): Map<string, FolderExtended> {
  return folders
    .sort((folderA, folderB) => {
      if (Number.isNaN(folderA.parent_folder_id) && Number.isNaN(folderB.parent_folder_id)) {
        return 0;
      }

      if (Number.isNaN(folderA.parent_folder_id)) {
        return -1;
      }

      if (Number.isNaN(folderB.parent_folder_id)) {
        return 1;
      }

      if (Number(folderA.parent_folder_id) < Number(folderB.parent_folder_id)) {
        return -1;
      }

      if (Number(folderA.parent_folder_id) > Number(folderB.parent_folder_id)) {
        return 1;
      }

      return 0;
    })
    .reduce((acc, folder) => {
      const extendedFolder = { ...folder, parent: undefined, childs: [], elements: [] } as FolderExtended;

      const parent = (folder.parent_folder_id && acc.get(folder.parent_folder_id)) || undefined;

      if (parent) {
        parent.childs = parent.childs || [];
        parent.childs.push(extendedFolder);

        extendedFolder.parent = parent;
      }

      acc.set(folder.folder_id, extendedFolder);

      return acc;
    }, new Map<string, FolderExtended>());
}

export function getFolderTree(folders: FolderExtended[]): FolderExtended[] {
  return folders.filter((folder) => !folder.parent);
}

export function getFolderTreeList(folder: FolderExtended): FolderExtended[] {
  const result: FolderExtended[] = [];

  result.push(folder);

  if (folder.childs) {
    for (const child of folder.childs) {
      result.push(...getFolderTreeList(child));
    }
  }

  return result;
}

export function folderToSidebarItem(folder: FolderExtended): SidebarItem {
  return {
    id: folder.folder_id,
    parent_id: folder.parent_folder_id,
    name: folder.name,
    childs: folder.childs?.map(folderToSidebarItem) || [],
  };
}
