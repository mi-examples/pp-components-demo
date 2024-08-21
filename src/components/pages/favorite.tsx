import { Preloader } from '@metricinsights/pp-components';
import { Outlet, useNavigate } from 'react-router-dom';
import PageSearchNoResults from '@/components/page-search/page-search-no-results';
import { FunctionComponent } from 'react';
import { useAppContext } from '@/app-context';
import { FolderElement } from '@/api/folder-element';
import PageFolder from '@/components/page-folder/page-folder';
import PageTopBar from '@/components/page-top-bar/page-top-bar';

export interface FavoriteProps {}

const Favorite: FunctionComponent<FavoriteProps> = () => {
  const { favoriteFolder, favoriteElementsMap, elementsMap, loading } = useAppContext();

  const navigate = useNavigate();

  if (!loading && !favoriteFolder) {
    navigate({ pathname: '/error404' }, { replace: true });
  }

  const favoriteElements = favoriteFolder
    ? (Array.from(favoriteElementsMap.values())
        .filter((el) => el.favorite_id === favoriteFolder.id)
        .map((el) => {
          return elementsMap.get(`${el.element_id}_${el.segment_value_id ?? 0}`);
        })
        .filter((el) => !!el) as FolderElement[])
    : [];

  return loading ? (
    <Preloader />
  ) : (
    <>
      <Outlet />
      <PageTopBar />
      <PageSearchNoResults>
        {favoriteFolder && (
          <PageFolder
            key={`folder-${favoriteFolder.id}`}
            folder={{
              folder_id: 'favorite',
              elements: favoriteElements,
              parent_folder_id: null,
              name: 'Favorites',
            }}
          />
        )}
      </PageSearchNoResults>
    </>
  );
};

export default Favorite;
