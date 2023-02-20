import { Animal as AnimalType } from "../../types/types"

const filterSpecies = (data: AnimalType[]) => {
  let speciesArray = data.map(animal => animal.species)
  const speciesSet = new Set(speciesArray)
  speciesArray = Array.from(speciesSet)
  return speciesArray
}

export default filterSpecies