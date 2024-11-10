import { useParams } from 'react-router-dom';

import { CharacterCard } from '@/components/shared/CharacterCard';
import { Loader } from '@/components/ui/loader';
import { useMiltipleCharacters } from '@/features/characters/api/getMultipleCharacters';
import { getCharacterIds } from '@/utils/getCharactersIds';

import { useEpisode } from '../api/getSingleEpisode';

export const SingleEpisode = () => {
  const { id } = useParams();
  const characterId = id ? parseInt(id, 10) : undefined;

  const { data, isLoading, isError } = useEpisode(characterId as number);

  const charactersIds = getCharacterIds(data?.characters || []);

  const { data: multipleCharacters } = useMiltipleCharacters(charactersIds);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || isError) {
    return <p>Error...</p>;
  }

  return (
    <div className="mb-20">
      <h1 className="mt-10 text-center text-6xl font-bold">
        Episode: <span className="text-purple-500">{data?.name}</span>
      </h1>
      <p className="mt-6 text-center">{data?.episode}</p>
      <p className="mt-6 text-center">
        Air date: <span className="text-muted-foreground">{data?.air_date}</span>
      </p>
      <p className="mb-6 text-xl font-bold">Characters: {multipleCharacters?.length}</p>
      <CharacterCard data={multipleCharacters} />
    </div>
  );
};
