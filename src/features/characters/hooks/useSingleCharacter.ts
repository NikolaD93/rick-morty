import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { VITE_BASE_URL } from '@/config';
import { Character } from '@/types/character';

export const useCharacter = (characterId: number): UseQueryResult<Character> => {
  const fetchCharacter = () =>
    axios.get<Character>(`${VITE_BASE_URL}/character/${characterId}`).then((res) => res.data);

  return useQuery<Character>({
    queryKey: ['character', characterId],
    queryFn: fetchCharacter,
    enabled: !!characterId,
  });
};
