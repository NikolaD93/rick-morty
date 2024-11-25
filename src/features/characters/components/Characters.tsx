import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ScrollToTop from 'react-scroll-to-top';

import { Loader } from '@/components/ui/loader';

import { CharacterCard } from '../../../components/shared/CharacterCard';
import { useCharacters } from '../api/getCharacters';

import { FilterCharacters } from './FilterCharacters';
import SearchInput from './SearchInput';

export const Characters = () => {
  const [inputValue, setInputValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    remove,
    refetch,
  } = useCharacters(inputValue, filterValue);

  const { ref, inView } = useInView();

  const handleInput = (value: string) => {
    setInputValue(value);
    remove();
    // refetch();
    //? Also coud've added characterName in the 'chacacters' queryKey - ['characters', characterName, filterValue], so no need for the remove then
  };

  const handleFilter = (value: string) => {
    setFilterValue(value);
    remove();
    // refetch();
    //? Also coud've added characterName in the 'chacacters' queryKey - ['characters', characterName, filterValue], so no need for the remove then
  };

  // From the data I get two arrays:
  //! pages: [
  //!  { /* response for page 1 */ },
  //!  { /* response for page 2 */ },
  //!  ...
  //! ],
  //! pageParams : [ /* pageParam values passed during fetch */ ]
  // And in the pages I've got an array with nested arrays, and then I need to use flatMap in order to make one array out of a couple of arrays.

  //? Could've display the data like this as well
  // <div>
  //   {data?.pages.map((page, id) => (
  //     <React.Fragment key={id}>
  //       {page.results.map((char) => (
  //         <p key={char.id}>{char.image}</p>
  //       ))}
  //     </React.Fragment>
  //   ))}
  // </div>;

  //TODO write explanation for useMemo
  const characters = useMemo(() => {
    if (!data) {
      return [];
    }
    const _characters = data?.pages.flatMap((page) => page.results) || [];
    return _characters;
    // return data?.pages.flatMap((page) => page.results) || []; //! Could've used this instead - shorter
  }, [data, inputValue, filterValue]);

  //! should've used useCallback instead -
  //  const { ref: inViewRef, inView } = useInView();

  //   const setRef = useCallback(
  //     (node) => {
  //       inViewRef(node); // Link the node to the inView observer
  //     },
  //     [inViewRef]
  //   );

  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }

  //<div ref={setRef}></div>

  useEffect(() => {
    if (inView && hasNextPage) {
      if (hasNextPage) {
        // redundant - should be removed
        fetchNextPage();
      }
    }
  }, [inView, hasNextPage, fetchNextPage]); // fetchNext page is redundat dependency

  if (isError) {
    return <p>Error...</p>;
  }

  return (
    <div className="mb-20">
      <h1 className="my-10 text-center text-7xl font-bold">Characters</h1>
      <div className="flex gap-4">
        <SearchInput inputValue={inputValue} setInputValue={handleInput} />
        <FilterCharacters setFilterValue={handleFilter} />
      </div>
      <ScrollToTop
        smooth
        color="#ffffff"
        width="24"
        height="24"
        style={{
          background: '#262626',
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {characters.length > 0 ? (
            <CharacterCard data={characters} />
          ) : (
            <p className="text-center text-lg font-semibold">No character found...</p>
          )}
        </>
      )}
      {isFetchingNextPage && <h3 className="text-center text-3xl font-bold">Loading...</h3>}
      <div ref={ref}></div>
    </div>
  );
};
