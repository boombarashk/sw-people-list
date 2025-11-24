import { useDispatch } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./peopleSlice";
import planetsReducer from "./planetsSlice";
import filmsReducer from "./filmsSlice";
import starshipsReducer from "./starshipsSlice";

const rootReducer = combineReducers({
  people: peopleSlice,
  planets: planetsReducer,
  films: filmsReducer,
  starships: starshipsReducer,
});

type TRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const store = configureStore({
  reducer: rootReducer,
});

export const usePeopleSelector = (state: TRootState) => state.people;
export const usePlanetSelector = (state: TRootState) => state.planets;
export const useFilmsSelector = (state: TRootState) => state.films;
export const useStarshipsSelector = (state: TRootState) => state.starships;
