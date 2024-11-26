import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { VITE_BACKEND_API } from '@/config';
import { Episode } from '@/types/episode';

export const useEpisode = (episodeId: number): UseQueryResult<Episode> => {
  const fetchEpisode = () =>
    axios.get<Episode>(`${VITE_BACKEND_API}/episode/${episodeId}`).then((res) => res.data);

  return useQuery<Episode>({
    queryKey: ['episode', episodeId],
    queryFn: fetchEpisode,
    enabled: !!episodeId, // this means that The query is enabled if episodeId is truthy (i.e., it is not null, undefined, an empty string, or an empty array). (if it is like this - !episodeId, that means it's falsy and it will not fetch the data)
    retry: 1, // (React Query retries 3 times by default)
  });
};
