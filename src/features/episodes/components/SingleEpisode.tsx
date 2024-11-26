import { AxiosError } from 'axios';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { CharacterCard } from '@/components/shared/CharacterCard';
import { Loader } from '@/components/ui/loader';
import { useMiltipleCharacters } from '@/features/characters/api/getMultipleCharacters';
import { getCharacterIds } from '@/utils/getCharactersIds';

import { useEpisode } from '../api/getSingleEpisode';

export const SingleEpisode = () => {
  const { id } = useParams();
  const characterId = id ? parseInt(id, 10) : undefined;
  // const [count, setCount] = useState(0);

  const { data, isLoading, isError, error } = useEpisode(characterId as number);

  const charactersIds = useMemo(() => {
    console.log('Recalculating character IDs...');
    return getCharacterIds(data?.characters || []);
  }, [data]);

  // const charactersIds = getCharacterIds(data?.characters || []);
  // console.log('Calculating character IDs (without useMemo)...');

  const { data: multipleCharacters } = useMiltipleCharacters(charactersIds);

  if (isLoading) {
    return <Loader />;
  }

  const isNotFoundError = (error as AxiosError)?.response?.status === 404;
  if (isNotFoundError) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-4xl text-muted-foreground">
          Episode with id <span className="text-foreground">{id}</span> not found...
        </p>
      </div>
    );
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
      {/* <button onClick={() => setCount(count + 1)}>Plus {count}</button> */}
      <CharacterCard data={multipleCharacters} />
    </div>
  );
};
