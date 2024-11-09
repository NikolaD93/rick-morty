import { useParams } from 'react-router-dom';

import { CharacterCard } from '@/components/shared/CharacterCard';
import { Loader } from '@/components/ui/loader';
import { useMiltipleCharacters } from '@/features/characters/api/getMultipleCharacters';

import { useLocation } from '../api/getSingleLocation';

export const SingleLocation = () => {
  const { id } = useParams();
  const locationId = id ? parseInt(id, 10) : undefined;

  const { data, isLoading, isError } = useLocation(locationId as number);

  const charactersIds =
    data?.residents?.map((residentUrl) => residentUrl.split('/').pop() || '') ?? [];

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
        Location: <span className="text-purple-500">{data?.name}</span>
      </h1>
      <p className="mt-6 text-center">{data?.type}</p>
      <p className="mt-6 text-center">
        Dimension: <span className="text-muted-foreground">{data?.dimension}</span>
      </p>
      <p className="mb-6 text-xl font-bold">Residents: {multipleCharacters?.length}</p>
      <CharacterCard data={multipleCharacters} />
    </div>
  );
};
