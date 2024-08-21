import React, { FunctionComponent, useState } from 'react';
import { PP_CONSTANTS } from '@/constants';
import { AppContext } from '@/app-context';
import { SidebarItem } from '@metricinsights/pp-components';
import { FolderExtended } from '@/helpers/folders.helper';
import { User } from '@/api/auth';
import { FolderElement } from '@/api/folder-element';
import { Favorite } from '@/api/favorite';
import { FavoriteElement } from '@/api/favorite-element';
import { Topic } from '@/api/topics';

export const AppProvider: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const [logo, setLogo] = React.useState<string | undefined>(PP_CONSTANTS.LOGO);
  const [title, setTitle] = React.useState<string | undefined>(PP_CONSTANTS.TITLE);
  const [sidebarItems, setSidebarItems] = React.useState<SidebarItem[]>([]);
  const [foldersMap, setFoldersMap] = React.useState<Map<string, FolderExtended>>(new Map<string, FolderExtended>());
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<User | null>(null);
  const [elementsMap, setElementsMap] = React.useState<Map<string, FolderElement>>(new Map<string, FolderElement>());
  const [search, setSearch] = React.useState<string>('');
  const [favoriteFolder, setFavoriteFolder] = React.useState<Favorite | null>(null);
  const [favoriteElementsMap, setFavoriteElementsMap] = React.useState<Map<string, FavoriteElement>>(
    new Map<string, FavoriteElement>(),
  );
  const [topics, setTopics] = useState<Topic[] | null>([]);

  return (
    <AppContext.Provider
      value={{
        logo,
        setLogo,
        title,
        setTitle,
        sidebarItems,
        setSidebarItems,
        foldersMap,
        setFoldersMap,
        loading,
        setLoading,
        user,
        setUser,
        elementsMap,
        setElementsMap,
        search,
        setSearch,
        favoriteFolder,
        setFavoriteFolder,
        favoriteElementsMap,
        setFavoriteElementsMap,
        topics,
        setTopics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
