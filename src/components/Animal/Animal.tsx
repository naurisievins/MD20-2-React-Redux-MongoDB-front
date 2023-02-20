import styles from './Animal.module.scss'
import { useAppSelector } from '../../store/hooks'
import { useGetAnimalsQuery, useGetAnimalsBySpeciesQuery } from '../../store/apiSlice'

export default function Animal() {

  const { filterSpecies } = useAppSelector((state) => state.animals)
  const { data: animalsData } = useGetAnimalsQuery()
  const { data: filterBySpecies } = useGetAnimalsBySpeciesQuery(filterSpecies)
  let filteredAnimals = animalsData;

  if (filterSpecies) {
    filteredAnimals = filterBySpecies
  }

  return (
    <>
      {filteredAnimals && filteredAnimals.map(animal => (
        <div className={styles.card} key={animal._id}>
          <div className={styles.card_img}>
            <img src={animal.imgLink} />
          </div>
          <div className={styles.card_name}>{animal.name}</div>
          <div className={styles.card_species}>{animal.species}</div>
        </div>
      ))}
    </>
  )
}