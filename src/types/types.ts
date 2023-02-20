export type Animal = {
  _id: string;
  name: string;
  imgLink: string;
  species: string;
};

export type CounterState = {
  allSpecies: string[];
  filterSpecies: string | null;
};
