import axios from 'axios';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { VITE_BACKEND_API } from '@/config';
import { Character } from '@/types/character';

interface CharactersResponse {
  // info?: {
  //   next: string | null;
  // };                     // could've added this so //@ts-expect-error tsc is not needed below
  results: Character[];
}

export const useCharacters = (
  characterName: string,
  filterValue: string
): UseInfiniteQueryResult<CharactersResponse> => {
  const fetchCharacters = async ({ pageParam = 1 }: { pageParam?: number }) => {
    // console.log(pageParam);
    try {
      const res = await axios.get<CharactersResponse>(`${VITE_BACKEND_API}/character`, {
        params: {
          name: characterName,
          page: pageParam,
          status: filterValue,
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

  //! coud've added characterName in the 'chacacters' queryKey - ['characters', characterName, filterValue]
  return useInfiniteQuery<CharactersResponse>(['characters'], fetchCharacters, {
    getNextPageParam: (lastPage, allPages) => {
      //LAST PAGE - represents the data returned from the most recent fetch (the last page of data retrieved so far).
      // ALL PAGES - All pages fetched so far including the last page
      // @ts-expect-error tsc
      if (lastPage?.info?.next !== null) {
        // had to use this check, because If I only used this :
        //! return lastPage.results.length > 0 ? allPages.length + 1 : undefined;
        // when I get to the last page, it will try to fetch again since lastPage.results.length = 6
        // if we came to the last page we will get next: null
        return lastPage.results.length > 0 ? allPages.length + 1 : undefined;
      }
      return undefined;
    },
  });
};
