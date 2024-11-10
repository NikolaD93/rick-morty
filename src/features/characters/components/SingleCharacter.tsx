import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { formatDate } from '@/utils/formatDate';
import { getStatusColor } from '@/utils/getStatusColor';

import { useCharacter } from '../api/getSingleCharacter';

export const SingleCharacter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const characterId = id ? parseInt(id, 10) : undefined;

  const { data, isLoading, isError } = useCharacter(characterId as number);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || isError) {
    return <p>Error...</p>;
  }

  const locationId = data.location.url.split('/').pop();

  return (
    <div>
      <div className="mt-10 flex items-center justify-center gap-10">
        <Button onClick={() => navigate('/characters')}>
          <ChevronLeft />
          Back
        </Button>
        <h1 className="text-center text-6xl font-bold">
          Character: <span className="text-purple-500">{data?.name}</span>
        </h1>
      </div>
      <div className="mx-auto my-20 w-[400px] gap-10">
        <div className="pb-10">
          <img className="w-full rounded-md object-cover" src={data?.image} alt={data.name} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xl">
              Status: <span className="text-muted-foreground">{data.status}</span>
            </p>
            <div className={`${getStatusColor(data.status)} h-3 w-3 rounded-full`}></div>
          </div>
          <p className="text-xl">
            Species: <span className="text-muted-foreground">{data.species}</span>
          </p>
          <p className="text-xl">
            Gender: <span className="text-muted-foreground">{data.gender}</span>
          </p>
          <p className="text-xl">
            Location:{' '}
            <Link to={`/location/${locationId}`} className="text-muted-foreground underline">
              {data.location.name}
            </Link>
          </p>
          <p className="text-xl">
            Origin: <span className="text-muted-foreground">{data.origin.name}</span>
          </p>
          <p className="text-xl">
            Created at: <span className="text-muted-foreground">{formatDate(data.created)}</span>
          </p>
          <div className="mt-4">
            <p className="mb-4 text-xl">Episode(s):</p>
            <div className="flex flex-wrap gap-2">
              {data?.episode.map((episodeUrl, index) => {
                const episodeId = new URL(episodeUrl).pathname.split('/').pop();
                return (
                  <Link
                    className="rounded-md border bg-muted p-2"
                    to={`/episode/${episodeId}`}
                    key={index}
                  >
                    Episode {episodeId}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
