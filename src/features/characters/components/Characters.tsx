import { useEffect, useState } from 'react';

import { Loader } from '@/components/ui/loader';
import { Character } from '@/types/character';

import { CharacterCard } from '../../../components/shared/CharacterCard';
import { useCharacters } from '../hooks/useCharacters';

import SearchInput from './SearchInput';

export const Characters = () => {
  const { data: characters, isLoading, isError } = useCharacters();
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const filtered =
      characters?.filter(
        (character) =>
          character.name && character.name.toLowerCase().includes(inputValue.toLowerCase())
      ) || [];
    setFilteredCharacters(filtered);
  }, [characters, inputValue]);

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
      {filteredCharacters.length > 0 ? (
        <CharacterCard data={filteredCharacters} />
      ) : (
        <p className="text-center text-lg font-semibold">No character found...</p>
      )}
    </div>
  );
};
