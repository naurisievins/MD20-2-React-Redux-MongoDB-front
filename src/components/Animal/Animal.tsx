import styles from './Animal.module.scss'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { useGetAnimalsQuery, useGetAnimalsBySpeciesQuery, useDeleteAnimalMutation } from '../../store/apiSlice'
import { setFilterSpecies } from '../../store/animalSlice'

export default function Animal() {

  const { filterSpecies } = useAppSelector((state) => state.animals)
  const { data: animalsData } = useGetAnimalsQuery()
  const { data: filterBySpecies } = useGetAnimalsBySpeciesQuery(filterSpecies)
  const [deleteAnimal] = useDeleteAnimalMutation()
  let filteredAnimals = animalsData
  const dispatch = useAppDispatch()

  if (filterSpecies) {
    filteredAnimals = filterBySpecies
  }

  return (
    <>
      {filteredAnimals && filteredAnimals.map(animal => (
        <div className={styles.card} key={animal._id}>
          <div className={styles.delete_button}>
            <span onClick={() => {
              deleteAnimal(animal._id)
              dispatch(setFilterSpecies(null))
            }
            }>
              x
            </span>
          </div>
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