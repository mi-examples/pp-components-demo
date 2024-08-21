import { api } from '@/api/base';
import useSWRImmutable from 'swr/immutable';

export interface Favorite {
  id: string;
  name: string;
  include_in_favorites_digest_ind: 'Y' | 'N';
  include_in_digest_on: string;
}

export const DEFAULT_FAVORITE_FOLDER = 'My Favorites';

async function apiGetFavorite() {
  return api
    .get<{ favorites: Favorite[] }>(`/favorite`)
    .then((response) => response.data)
    .then((data) => data.favorites)
    .then((favorites) => {
      return favorites.find((favorite) => favorite.name === DEFAULT_FAVORITE_FOLDER);
    });
}

export function useSWRFavorite(skip = false) {
  return useSWRImmutable(skip ? null : '/favorite', apiGetFavorite, {
    revalidateIfStale: false,
  });
}
