import { FolderExtended } from '@/helpers/folders.helper';
import { BreadcrumbsCrumb } from '@metricinsights/pp-components';

export function buildBreadcrumbs(folder: FolderExtended): BreadcrumbsCrumb[] {
  const breadcrumbs: BreadcrumbsCrumb[] = [];

  let currentFolder: FolderExtended | null = folder;

  const isNamedFolder = Number.isNaN(+currentFolder.folder_id);

  while (currentFolder) {
    breadcrumbs.unshift({
      id: currentFolder.folder_id,
      title: currentFolder.name,
      href: isNamedFolder ? String(currentFolder.folder_id) : `/folder/${currentFolder.folder_id}`,
    });

    currentFolder = currentFolder.parent || null;
  }

  return breadcrumbs;
}
