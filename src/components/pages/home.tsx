import { FunctionComponent } from 'react';
import { Preloader } from '@metricinsights/pp-components';
import { getFolderTree, getFolderTreeList } from '@/helpers/folders.helper';
import { useAppContext } from '@/app-context';
import PageFolder from '@/components/page-folder/page-folder';
import { Outlet } from 'react-router-dom';
import PageSearchNoResults from '@/components/page-search/page-search-no-results';
import PageTopBar from '@/components/page-top-bar/page-top-bar';

export interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { foldersMap, loading } = useAppContext();

  const topLevelFolders = getFolderTree(Array.from(foldersMap.values()));

  return loading ? (
    <Preloader />
  ) : (
    <>
      <Outlet />
      <PageTopBar />
      <PageSearchNoResults>
        {topLevelFolders.map((topLevelFolder) => {
          return getFolderTreeList(topLevelFolder).map((f) => (
            <PageFolder key={`root-folder-${f.folder_id}`} folder={f} />
          ));
        })}
      </PageSearchNoResults>
    </>
  );
};

export default Home;
