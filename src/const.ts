import type { KeyPeopleProps } from "./types";

export const API_GET_PEOPLE = `${process.env.API_URL}/people`;
export const API_GET_PLANETS = `${process.env.API_URL}/planets`;
export const API_GET_FILMS = `${process.env.API_URL}/films`;
export const API_GET_SHIPS = `${process.env.API_URL}/starships`;
export const COUNT_ITEMS = 10;

export const NO_ITERABLE_STRING_PROPS: Partial<KeyPeopleProps>[] = [
  "name",
  "url",
  "created",
  "edited",
];
export const NO_EDITABLE_STRING_PROPS = ["homeworld", "gender"];

export const LABEL_PEOPLE_PROPS: Record<string, string> = {
  height: "Рост",
  mass: "Вес",
  hair_color: "Цвет волос",
  skin_color: "Цвет кожи",
  eye_color: "Цвет глаз",
  birth_year: "Год рождения",
  homeworld: "Планета",
  films: "Фильмы",
  starships: "Корабли",
};

export const EPISODE_ID = ["I", "II", "III", "IV", "V", "VI"];
