import { api } from '@/api/base';
import useSWR from 'swr';

export interface FavoriteElement {
  element_id: string;
  segment_value_id: string;
  favorite_id: string;
}

export interface FavoriteElementsOpts {
  favoriteId?: string;
}

async function apiGetFavoriteElements(opts?: FavoriteElementsOpts) {
  const { favoriteId } = opts || {};

  const searchParams = new URLSearchParams({});

  if (favoriteId) {
    searchParams.append('favorite_id', favoriteId);
  }

  return api
    .get<{ favorite_elements: FavoriteElement[] }>(`/favorite_element?${searchParams.toString()}`)
    .then((response) => response.data)
    .then((data) => data.favorite_elements);
}

export function useSWRFavoriteElements(opts?: { skip?: boolean } & FavoriteElementsOpts) {
  const { skip = false, ...rest } = opts || {};

  return useSWR(skip ? null : `/favorite_element?${new URLSearchParams(rest || {}).toString()}`, () =>
    apiGetFavoriteElements(rest),
  );
}

export async function apiAddElementToFavorite(favorite_id: string, element_id: string, segment_value_id: string) {
  return await api.post(`/favorite_element`, { favorite_id, element_id, segment_value_id });
}

export async function apiDeleteFavoriteElement(favorite_id: string, element_id: string, segment_value_id: string) {
  const searchParams = new URLSearchParams({
    favorite_id,
    id: element_id,
    segment_value_id,
  });

  return await api.delete(`/favorite_element?${searchParams.toString()}`);
}
