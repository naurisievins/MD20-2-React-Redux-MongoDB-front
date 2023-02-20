import styles from './Animal.module.scss'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { Animal as AnimalType } from '../../store/animalSlice';

export default function Animal() {

  const { animals, filterSpecies } = useAppSelector((state) => state.animals)
  let filteredAnimals: AnimalType[];

  if (filterSpecies) {
    filteredAnimals = animals.filter(animal => {
      return animal.species === filterSpecies;
    })
  } else {
    filteredAnimals = animals
  }

  return (
    <>
      {filteredAnimals.map(animal => (
        <div className={styles.card} key={animal.id}>
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