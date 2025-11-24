import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import type { ListItem, IPeople, IPlanet, IFilm, IShip } from "./types";
import {
  API_GET_FILMS,
  API_GET_PEOPLE,
  API_GET_PLANETS,
  API_GET_SHIPS,
} from "./const";
import { useAppDispatch, usePeopleSelector } from "./store/store";
import { setCount, setList, setLoaded } from "./store/peopleSlice";
import { setPlanetsData } from "./store/planetsSlice";
import { setFilms } from "./store/filmsSlice";
import { setStarshipsData } from "./store/starshipsSlice";

const reduceResults = <T extends { url: string }>(results: Array<T>) =>
  results.reduce((result: ListItem<T>, item: T) => {
    result[item.url] = item;
    return result;
  }, {});

const useGetCollections = () => {
  const dispatch = useAppDispatch();
  const [pageLoadPeople, setPageLoadPeople] = useState<number>(1);
  const [pageLoadPlanets, setPageLoadPlanets] = useState<number>(1);
  const [pageLoadStarships, setPageLoadStarships] = useState<number>(1);
  const { list } = useSelector(usePeopleSelector);

  const { data, error } = useQuery({
    queryKey: ["people", pageLoadPeople],
    queryFn: ({ signal }) =>
      fetch(`${API_GET_PEOPLE}?page=${pageLoadPeople}`, { signal }).then(
        (res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        },
      ),
  });

  useEffect(() => {
    if (data?.count) dispatch(setCount(data.count));
    if (data?.results) {
      dispatch(setList(reduceResults<IPeople>(data.results)));
    }
    if (data?.next) {
      setPageLoadPeople(Number(data.next.slice(data.next.length - 1)));
    } else {
      if (Object.keys(list).length > 0) {
        dispatch(setLoaded());
      }
    }
  }, [data, pageLoadPeople]);

  const { data: films } = useQuery({
    queryKey: ["films"],
    queryFn: ({ signal }) =>
      fetch(API_GET_FILMS, { signal }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      }),
  });

  useEffect(() => {
    if (films?.results) {
      dispatch(setFilms(reduceResults<IFilm>(films.results)));
    }
  }, [films]);

  const { data: planets } = useQuery({
    queryKey: ["planets", pageLoadPlanets],
    queryFn: ({ signal }) =>
      fetch(`${API_GET_PLANETS}?page=${pageLoadPlanets}`, { signal }).then(
        (res) => {
          if (res.ok) {
            return res.json();
          }
        },
      ),
  });

  useEffect(() => {
    if (planets?.results) {
      dispatch(setPlanetsData(reduceResults<IPlanet>(planets.results)));
    }
    if (planets?.next) {
      setPageLoadPlanets(Number(planets.next.slice(planets.next.length - 1)));
    }
  }, [planets]);

  const { data: starships } = useQuery({
    queryKey: ["starships", pageLoadStarships],
    queryFn: ({ signal }) =>
      fetch(`${API_GET_SHIPS}?page=${pageLoadStarships}`, { signal }).then(
        (res) => {
          if (res.ok) {
            return res.json();
          }
        },
      ),
  });

  useEffect(() => {
    if (starships?.results) {
      dispatch(setStarshipsData(reduceResults<IShip>(starships.results)));
    }
    if (starships?.next) {
      setPageLoadStarships(
        Number(starships.next.slice(starships.next.length - 1)),
      );
    }
  }, [starships]);
};

export default useGetCollections;
