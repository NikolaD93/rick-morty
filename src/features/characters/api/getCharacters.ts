import axios from 'axios';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { VITE_BACKEND_API } from '@/config';
import { Character } from '@/types/character';

interface CharactersResponse {
  results: Character[];
}

export const useCharacters = (): UseInfiniteQueryResult<CharactersResponse> => {
  const fetchCharacters = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const res = await axios.get<CharactersResponse>(
      `${VITE_BACKEND_API}/character?page=${pageParam}`
    );
    return res.data;
  };

  return useInfiniteQuery<CharactersResponse>(['characters'], fetchCharacters, {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.results.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};
