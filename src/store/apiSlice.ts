// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Animal } from "../types/types";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/" }),
  tagTypes: ["animals"],
  endpoints: (builder) => ({
    getAnimals: builder.query<Animal[], void>({
      query: () => "animals/",
      providesTags: ["animals"],
    }),
    getAnimalsBySpecies: builder.query({
      query: (speciesName) => `species/${speciesName}`,
      providesTags: ["animals"],
    }),
    addAnimal: builder.mutation<void, Animal>({
      query: (post) => ({
        url: "animals",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["animals"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAnimalsBySpeciesQuery,
  useGetAnimalsQuery,
  useAddAnimalMutation,
} = apiSlice;
