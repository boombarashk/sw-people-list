import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IPlanet, IPlanetsState, ListItem } from "../types";

const initialState: IPlanetsState = {
  data: {},
};

const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    setPlanetsData: (state, action: PayloadAction<ListItem<IPlanet>>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { setPlanetsData } = planetsSlice.actions;
export default planetsSlice.reducer;
