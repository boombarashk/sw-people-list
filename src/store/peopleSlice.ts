import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { COUNT_ITEMS } from "../const";
import type { IPeople, IPeopleState, ListItem } from "../types";

const initialState: IPeopleState = {
  list: {},
  selectedPeople: [],
  count: 0,
  page: 1,
  searchTerm: "",
  loaded: false,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setLoaded: (state) => {
      state.loaded = true;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    setList: (state, action: PayloadAction<ListItem<IPeople>>) => {
      state.list = {
        ...state.list,
        ...action.payload,
      };
    },

    filterList: (state, action: PayloadAction<number>) => {
      const page = action.payload;
      state.selectedPeople = Object.values(state.list).slice(
        (page - 1) * COUNT_ITEMS,
        page * COUNT_ITEMS,
      );
    },

    filterByTerm: (state, action: PayloadAction<string>) => {
      const term = action.payload;
      state.selectedPeople = Object.values(state.list).filter(
        (people) => people.name.toLowerCase().indexOf(term.toLowerCase()) >= 0,
      );
    },

    patchCard: (state, action: PayloadAction<Partial<IPeople>>) => {
      const { url } = action.payload;
      if (typeof url == "string")
        state.list = {
          ...state.list,
          [url]: {
            ...state.list[url],
            ...action.payload,
          },
        };
    },
  },
});

export const {
  setCount,
  setPage,
  setSearchTerm,
  setList,
  filterList,
  filterByTerm,
  patchCard,
  setLoaded,
} = peopleSlice.actions;
export default peopleSlice.reducer;
