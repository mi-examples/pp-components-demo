import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import PageBreadcrumbs from '@/components/page-breadcrumbs/page-breadcrumbs';

import styles from './page-folder.module.scss';
import { FolderExtended } from '@/helpers/folders.helper';
import PageElement from '@/components/page-element/page-element';
import { useAppContext } from '@/app-context';
import { FolderElement } from '@/api/folder-element';
import { getSearchTokens, searchMatchAll, SearchToken } from '@/helpers/search.helper';

export interface PageFolderProps {
  folder: FolderExtended;
}

const PageFolder: FunctionComponent<PageFolderProps> = ({ folder }) => {
  const { search } = useAppContext();

  const [searchTokens, setSearchTokens] = useState<SearchToken[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setSearchTokens(search ? getSearchTokens(search) : []);
  }, [search]);

  useEffect(() => {
    if ((!search && !searchTokens.length) || (search && searchTokens.length)) {
      setLoading(false);
    }
  }, [search, searchTokens]);

  const folderNameMatch = useCallback(
    (f: FolderExtended) => {
      if (!search || !searchTokens.length) {
        return true;
      }

      return searchMatchAll(searchTokens, f.name);
    },
    [search, searchTokens],
  );

  const showElement = useCallback(
    (e: FolderElement) => {
      if (!search || !searchTokens.length) {
        return true;
      }

      return searchMatchAll(searchTokens, e.element_dashboard_name);
    },
    [search, searchTokens],
  );

  const showFolder = useCallback(
    (f: FolderExtended, deepElements = true): boolean => {
      if (!search || !searchTokens.length) {
        return true;
      }

      const isFolderNameMatch = folderNameMatch(f);
      const isElementMatch = deepElements ? f.elements.some(showElement) : false;
      const isChildMatch = f.childs?.some((folder) => showFolder(folder, false)) ?? false;

      return isFolderNameMatch || isElementMatch || isChildMatch;
    },
    [folderNameMatch, search, searchTokens, showElement],
  );

  const visibleElements = useMemo(() => {
    return folder.elements.filter((e) => folderNameMatch(folder) || showElement(e));
  }, [folder, folderNameMatch, showElement]);

  return (
    folder &&
    showFolder(folder) &&
    folder.elements?.length > 0 && (
      <div className={styles.pageFolder}>
        {!loading && (
          <>
            <PageBreadcrumbs folder={folder} />
            <div className={styles.pageFolder__elements_wrapper}>
              {visibleElements.map((e) => {
                return <PageElement key={`element-${e.element_id}-${e.segment_value_id}`} element={e} />;
              })}
            </div>
          </>
        )}
      </div>
    )
  );
};

export default PageFolder;
