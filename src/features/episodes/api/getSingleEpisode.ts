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
    enabled: !!episodeId,
  });
};
