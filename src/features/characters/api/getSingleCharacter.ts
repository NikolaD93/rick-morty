import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { VITE_BACKEND_API } from '@/config';
import { Character } from '@/types/character';

export const useCharacter = (characterId: number): UseQueryResult<Character> => {
  const fetchCharacter = () =>
    axios.get<Character>(`${VITE_BACKEND_API}/character/${characterId}`).then((res) => res.data);

  return useQuery<Character>({
    queryKey: ['character', characterId],
    queryFn: fetchCharacter,
    enabled: !!characterId, // this means that The query is enabled if charactersId is truthy (i.e., it is not null, undefined, an empty string, or an empty array). (if it is like this - !charactersIds, that means it's falsy and it will not fetch the data)
    retry: 1, // (React Query retries 3 times by default)
  });
};
