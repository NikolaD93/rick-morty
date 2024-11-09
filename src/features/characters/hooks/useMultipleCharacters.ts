import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { VITE_BASE_URL } from '@/config';
import { Character } from '@/types/character';

export const useMiltipleCharacters = (charactersIds: string[]): UseQueryResult<Character[]> => {
  const fetchMultipleCharacters = () =>
    axios.get<Character[]>(`${VITE_BASE_URL}/character/${charactersIds}`).then((res) => res.data);

  return useQuery<Character[]>({
    queryKey: ['multipleCharacters', charactersIds],
    queryFn: fetchMultipleCharacters,
    enabled: !!charactersIds,
  });
};
