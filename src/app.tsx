import './assets/css/app.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSWRFolders } from '@/api/folder';
import { useSWRFolderElements } from '@/api/folder-element';
import { useEffect } from 'react';
import { foldersToMap, folderToSidebarItem, getFolderTree } from '@/helpers/folders.helper';
import { useAppContext } from '@/app-context';
import { useSWRUser } from '@/api/auth';
import { elementsToMap } from '@/helpers/elements.helper';
import { rootRoutes } from '@/routes';
import { useSWRFavorite } from '@/api/favorite';
import { useSWRFavoriteElements } from '@/api/favorite-element';
import { useSWRTopics } from './api/topics';

const basename = window.location.pathname.replace(/^(\/pt?\/[^/]+\/?).*/, '$1');

const routes = createBrowserRouter([...rootRoutes], { basename });

function App() {
  const {
    sidebarItems,
    setSidebarItems,
    setFoldersMap,
    setLoading,
    loading,
    setUser,
    foldersMap,
    setElementsMap,
    favoriteFolder,
    setFavoriteFolder,
    setFavoriteElementsMap,
    setTopics,
  } = useAppContext();

  const { data: user, isLoading: isUserLoading } = useSWRUser();

  useEffect(() => {
    if (!isUserLoading && user) {
      setUser(user);
    }
  }, [user, setUser, isUserLoading]);

  const { data: folders, isLoading: isFoldersLoading } = useSWRFolders(isUserLoading || !user);
  const { data: folderElements, isLoading: isFolderElementsLoading } = useSWRFolderElements({
    skip: isUserLoading || !user,
  });
  const { data: favoriteFolderResult, isLoading: isFavoriteFoldersLoading } = useSWRFavorite(isUserLoading || !user);
  const { data: userFavoriteElements, isLoading: isUserFavoriteElementsLoading } = useSWRFavoriteElements({
    skip: isUserLoading || !user || isFavoriteFoldersLoading || !favoriteFolderResult,
    favoriteId: favoriteFolderResult?.id,
  });
  const { data: topicsData, isLoading: isTopicsLoading } = useSWRTopics();

  useEffect(() => {
    if (!isTopicsLoading && topicsData) {
      setTopics(topicsData);
    }
  }, [topicsData]);

  useEffect(() => {
    if (
      !isUserLoading &&
      !(isFoldersLoading || isFolderElementsLoading || isUserFavoriteElementsLoading || isFavoriteFoldersLoading)
    ) {
      setLoading(false);
    }
  }, [
    isFavoriteFoldersLoading,
    isFolderElementsLoading,
    isFoldersLoading,
    isUserFavoriteElementsLoading,
    isUserLoading,
    setLoading,
  ]);

  useEffect(() => {
    if (!loading && (!sidebarItems || sidebarItems.length === 0) && folders?.length) {
      const foldersMap = foldersToMap(folders ?? []);

      const { folder_items, folder_elements } = folderElements!;

      const elementsMap = elementsToMap(folder_elements);

      for (const item of folder_items) {
        const element = elementsMap.get(`${item.element_id}_${item.segment_value_id || '0'}`);
        const folder = foldersMap.get(item.folder_id);

        if (element && folder) {
          folder.elements.push(element);
        }
      }

      setElementsMap(elementsMap);

      setFoldersMap(foldersMap);

      const items = getFolderTree(Array.from(foldersMap.values())).map(folderToSidebarItem);

      setSidebarItems(items);
    }
  }, [
    folderElements,
    folders,
    foldersMap,
    isFolderElementsLoading,
    isUserLoading,
    loading,
    setElementsMap,
    setFoldersMap,
    setSidebarItems,
    sidebarItems,
    user,
  ]);

  useEffect(() => {
    if (!isUserFavoriteElementsLoading && favoriteFolderResult) {
      setFavoriteFolder(favoriteFolderResult);

      if (userFavoriteElements) {
        const favoriteElementsMap = elementsToMap(userFavoriteElements);

        setFavoriteElementsMap(favoriteElementsMap);
      }
    }
  }, [
    isUserFavoriteElementsLoading,
    favoriteFolder,
    favoriteFolderResult,
    setFavoriteElementsMap,
    setFavoriteFolder,
    userFavoriteElements,
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
