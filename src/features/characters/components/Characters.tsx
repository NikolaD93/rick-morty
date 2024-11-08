import { Loader } from '@/components/ui/loader';

import { useCharacters } from '../hooks/useCharacters';

export const Characters = () => {
  const { data: characters, isLoading, isError } = useCharacters();

  if (isLoading) {
    return <Loader />;
  }

  if (!characters || isError) {
    return <p>Error...</p>;
  }
  console.log(characters);
  return <div>Characters</div>;
};
