import axios from 'axios';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { VITE_BACKEND_API } from '@/config';
import { Character } from '@/types/character';

interface CharactersResponse {
  results: Character[];
}

export const useCharacters = (): UseInfiniteQueryResult<CharactersResponse> => {
  const fetchCharacters = async ({ pageParam }: { pageParam: number }) => {
    const res = await axios.get<CharactersResponse>(
      `${VITE_BACKEND_API}/character?page=${pageParam}`
    );
    return res.data;
  };

  return useInfiniteQuery<CharactersResponse>({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
    defaultPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
  });
};
