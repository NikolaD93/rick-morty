import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Character } from '@/types/character';
import { getStatusColor } from '@/utils/getStatusColor';

type CharacterCardProps = {
  filteredCharacters: Character[];
};

export const CharacterCard = ({ filteredCharacters }: CharacterCardProps) => {
  return (
    <div className="flex flex-wrap justify-between gap-10">
      {filteredCharacters.map((character) => {
        return (
          <Card key={character.id} className="w-[350px]">
            <CardHeader>
              <img className="rounded-sm" src={character.image} alt={character.name} />
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
        );
      })}
    </div>
  );
};
