import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ScrollToTop from 'react-scroll-to-top';

import { Loader } from '@/components/ui/loader';

import { CharacterCard } from '../../../components/shared/CharacterCard';
import { useCharacters } from '../api/getCharacters';

import SearchInput from './SearchInput';

export const Characters = () => {
  const [inputValue, setInputValue] = useState('');
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, remove } =
    useCharacters(inputValue);
  const { ref, inView } = useInView();

  const handleInput = (value: string) => {
    setInputValue(value);
    remove();
  };

  const characters = useMemo(() => {
    if (!data) {
      return [];
    }
    const _characters = data?.pages.flatMap((page) => page.results) || [];
    return _characters;
  }, [data, inputValue]);

  useEffect(() => {
    if (inView && hasNextPage) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return <p>Error...</p>;
  }

  return (
    <div className="mb-20">
      <h1 className="my-10 text-center text-7xl font-bold">Characters</h1>
      <SearchInput inputValue={inputValue} setInputValue={handleInput} />
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
