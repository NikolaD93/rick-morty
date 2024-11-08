import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

import { VITE_BASE_URL } from '@/config';
import { Character } from '@/types/character';

interface CharactersResponse {
  results: Character[];
}

export const useCharacters = (): UseQueryResult<Character[]> => {
  const fetchCharacters = () =>
    axios.get<CharactersResponse>(VITE_BASE_URL + '/character').then((res) => res.data.results);

  return useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
  });
};
