import { Link } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Character } from '@/types/character';
import { getStatusColor } from '@/utils/getStatusColor';

type CharacterCardProps = {
  data: Character[] | undefined;
  innerRef?: React.Ref<HTMLDivElement>;
};

export const CharacterCard = ({ data, innerRef }: CharacterCardProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-10">
      {data?.map((character, idx) => {
        const isLastItem = idx + 1 === data.length;
        return (
          <Link to={`/characters/${character.id}`} key={character.id}>
            <Card ref={isLastItem ? innerRef : undefined} className="w-[350px]">
              <CardHeader>
                <img
                  className="rounded-sm"
                  src={character.image}
                  alt={character.name}
                  loading="lazy"
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{character.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {character.status}{' '}
                  <div className={`${getStatusColor(character.status)} h-3 w-3 rounded-full`}></div>
                </CardDescription>
                <Separator className="my-4" />
                <div className="mt-4 flex justify-between">
                  <CardDescription>Gender: {character.gender}</CardDescription>
                  <CardDescription>Species: {character.species}</CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
