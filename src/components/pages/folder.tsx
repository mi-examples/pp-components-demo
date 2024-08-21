import { FunctionComponent } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '@/app-context';
import PageFolder from '@/components/page-folder/page-folder';
import { Preloader } from '@metricinsights/pp-components';
import { getFolderTreeList } from '@/helpers/folders.helper';
import PageSearchNoResults from '@/components/page-search/page-search-no-results';
import PageTopBar from '@/components/page-top-bar/page-top-bar';

export interface FolderProps {}

const Folder: FunctionComponent<FolderProps> = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const { foldersMap, loading } = useAppContext();

  const folder = folderId && foldersMap?.get(folderId);

  const folderTreeList = folder ? getFolderTreeList(folder) : [];

  const navigate = useNavigate();

  if (!loading && !folder) {
    navigate({ pathname: '/error404' }, { replace: true });
  }

  return loading ? (
    <Preloader />
  ) : (
    <>
      <Outlet />
      <PageTopBar />
      <PageSearchNoResults>
        {folder
          ? folderTreeList.map((f) => {
              return <PageFolder key={`folder-${f.folder_id}`} folder={f} />;
            })
          : 'Folder not found'}
      </PageSearchNoResults>
    </>
  );
};

export default Folder;
