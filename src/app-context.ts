import React, { Dispatch, SetStateAction } from 'react';
import { SidebarItem } from '@metricinsights/pp-components';
import { FolderExtended } from '@/helpers/folders.helper';
import { User } from '@/api/auth';
import { FolderElement } from '@/api/folder-element';
import { Favorite } from '@/api/favorite';
import { FavoriteElement } from '@/api/favorite-element';
import { Topic } from '@/api/topics';

export interface AppContextProps {
  logo?: string;
  setLogo: Dispatch<SetStateAction<string | undefined>>;
  title?: string;
  setTitle: Dispatch<SetStateAction<string | undefined>>;
  foldersMap: Map<string, FolderExtended>;
  setFoldersMap: Dispatch<SetStateAction<Map<string, FolderExtended>>>;
  sidebarItems: SidebarItem[];
  setSidebarItems: Dispatch<SetStateAction<SidebarItem[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  elementsMap: Map<string, FolderElement>;
  setElementsMap: Dispatch<SetStateAction<Map<string, FolderElement>>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  favoriteFolder: Favorite | null;
  setFavoriteFolder: Dispatch<SetStateAction<Favorite | null>>;
  favoriteElementsMap: Map<string, FavoriteElement>;
  setFavoriteElementsMap: Dispatch<SetStateAction<Map<string, FavoriteElement>>>;
  setTopics: Dispatch<SetStateAction<Topic[] | null>>;
  topics: Topic[] | null;
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
};
