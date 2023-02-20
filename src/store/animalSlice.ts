import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Animal {
  id: string;
  name: string;
  imgLink: string;
  species: string;
}

// Define a type for the slice state
interface CounterState {
  animals: Animal[];
  allSpecies: string[];
  filterSpecies: string;
}

const storageItems = localStorage.getItem("animals");
const storageSpecies = localStorage.getItem("species");

// Define the initial state using that type
const initialState: CounterState = {
  animals: storageItems ? JSON.parse(storageItems) : [],
  allSpecies: storageSpecies ? JSON.parse(storageSpecies) : [],
  filterSpecies: "",
};

export const animalSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    addAnimal: (state, action: PayloadAction<Animal>) => {
      const animalObject = {
        id: action.payload.id,
        imgLink: action.payload.imgLink,
        name: validateNameAndSpecies(action.payload.name),
        species: validateNameAndSpecies(action.payload.species),
      };
      state.animals.push(animalObject);
      localStorage.setItem("animals", JSON.stringify(state.animals));
      state.allSpecies.push(animalObject.species);
      const set = new Set(state.allSpecies);
      state.allSpecies = Array.from(set);
      localStorage.setItem("species", JSON.stringify(state.allSpecies));
    },
    setFilterSpecies: (state, action: PayloadAction<string>) => {
      state.filterSpecies = action.payload;
    },
  },
});

const validateNameAndSpecies = (input: string) => {
  let result = input.trim().toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const { addAnimal, setFilterSpecies } = animalSlice.actions;
export default animalSlice.reducer;
