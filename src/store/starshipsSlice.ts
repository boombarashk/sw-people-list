import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IShip, IShipsState, ListItem } from "../types";

const initialState: IShipsState = {
  data: {},
};

const starshipsSlice = createSlice({
  name: "starships",
  initialState,
  reducers: {
    setStarshipsData: (state, action: PayloadAction<ListItem<IShip>>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { setStarshipsData } = starshipsSlice.actions;
export default starshipsSlice.reducer;
