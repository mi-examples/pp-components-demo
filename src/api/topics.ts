import { api } from '@/api/base';
import useSWR from 'swr';

export interface Topic {
  id: string;
  name: string;
}

async function getTopics() {
  return api
    .get<{ topics: Topic[] }>('/api/topic', {
      baseURL: '/',
    })
    .then((response) => response.data.topics);
}

export function useSWRTopics() {
  return useSWR('/api/topic', getTopics);
}
