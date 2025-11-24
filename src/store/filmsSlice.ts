import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IFilm, IFilmsState, ListItem } from "../types";

const initialState: IFilmsState = {
  data: {},
  //error
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilms: (state, action: PayloadAction<ListItem<IFilm>>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { setFilms } = filmsSlice.actions;
export default filmsSlice.reducer;
