import axios from 'axios';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { VITE_BACKEND_API } from '@/config';
import { Character } from '@/types/character';

interface CharactersResponse {
  results: Character[];
}

export const useCharacters = (
  characterName: string
): UseInfiniteQueryResult<CharactersResponse> => {
  const fetchCharacters = async ({ pageParam = 1 }: { pageParam?: number }) => {
    try {
      const res = await axios.get<CharactersResponse>(`${VITE_BACKEND_API}/character`, {
        params: {
          name: characterName,
          page: pageParam,
        },
      });
      return res.data;
    } catch (err: unknown) {
      console.error(err);
      return {
        results: [],
      };
    }
  };

  return useInfiniteQuery<CharactersResponse>(['characters'], fetchCharacters, {
    getNextPageParam: (lastPage, allPages) => {
      //@ts-expect-error tsc
      if (lastPage?.info?.next !== null) {
        return lastPage.results.length > 0 ? allPages.length + 1 : undefined;
      }

      return undefined;
    },
  });
};
