type Location = {
  name: string;
  url: string;
};

type Origin = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string | null;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};
