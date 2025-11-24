export interface IList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type ListItem<T> = Record<string, T>;

export interface IItem {
  url: string;
  created: Date;
  edited: Date;
}

export interface IPeople extends IItem {
  name: string;
  height: string; //number
  mass: string; //number
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: "male" | "female";
  homeworld: string;
  films: string[];
  species: [];
  vehicles: string[];
  starships: string[];
}

export type KeyPeopleProps = Partial<keyof IPeople>;

export interface IPeopleState {
  list: Record<string, IPeople>;
  selectedPeople: IPeople[];
  count: number;
  page: number;
  searchTerm: string;
  loaded: boolean;
}

export interface IPlanet extends IItem {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
}

export interface IPlanetsState {
  data: Record<string, IPlanet>;
}

export interface IFilm extends IItem {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

export interface IFilmsState {
  data: Record<string, IFilm>;
}

export interface IShip extends IItem {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
}

export interface IShipsState {
  data: Record<string, IShip>;
}

type EditablePeopleProps = [
  "height",
  "mass",
  "hair_color",
  "skin_color",
  "eye_color",
  "birth_year",
  "url",
];
export type EditableRecord = {
  [K in EditablePeopleProps[number]]: string;
};
