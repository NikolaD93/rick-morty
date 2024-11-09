import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ScrollToTop from 'react-scroll-to-top';

import { Loader } from '@/components/ui/loader';

import { CharacterCard } from '../../../components/shared/CharacterCard';
import { useCharacters } from '../api/getCharacters';

import SearchInput from './SearchInput';

export const Characters = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharacters();
  const [inputValue, setInputValue] = useState('');
  const { ref, inView } = useInView();

  const characters = data?.pages.flatMap((page) => page.results) || [];

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  console.log(filteredCharacters);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loader />;
  }

  if (!characters || isError) {
    return <p>Error...</p>;
  }

  return (
    <div className="mb-20">
      <h1 className="my-10 text-center text-7xl font-bold">Characters</h1>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
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
      {filteredCharacters.length > 0 ? (
        <CharacterCard innerRef={ref} data={filteredCharacters} />
      ) : (
        <p className="text-center text-lg font-semibold">No character found...</p>
      )}
      {isFetchingNextPage && <h3 className="text-center text-3xl font-bold">Loading...</h3>}
    </div>
  );
};
