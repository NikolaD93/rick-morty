import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { VITE_BACKEND_API } from '@/config';
import { Character } from '@/types/character';

export const useMiltipleCharacters = (charactersIds: string[]): UseQueryResult<Character[]> => {
  const fetchMultipleCharacters = () =>
    axios
      .get<Character[]>(`${VITE_BACKEND_API}/character/${charactersIds}`)
      .then((res) => res.data);

  return useQuery<Character[]>({
    queryKey: ['multipleCharacters', charactersIds],
    queryFn: fetchMultipleCharacters,
    enabled: !!charactersIds,
  });
};
