import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterState } from "../types/types";

// Define the initial state using that type
const initialState: CounterState = {
  allSpecies: [],
  filterSpecies: null,
};

export const animalSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    setFilterSpecies: (state, action: PayloadAction<string | null>) => {
      state.filterSpecies = action.payload;
    },
    setSpecies: (state, action: PayloadAction<string[]>) => {
      state.allSpecies = [];
      const species = action.payload;
      state.allSpecies = species;
    },
  },
});

export const { setFilterSpecies, setSpecies } = animalSlice.actions;
export default animalSlice.reducer;
