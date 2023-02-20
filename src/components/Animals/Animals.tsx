import styles from './Animals.module.scss'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { setFilterSpecies } from '../../store/animalSlice'
import Animal from '../Animal/Animal'
import AddAnimal from '../AddAnimal.tsx/AddAnimal'
import { v4 as uuid } from 'uuid'

export default function Animals() {

  const { animals, filterSpecies, allSpecies } = useAppSelector((state) => state.animals)
  const dispatch = useAppDispatch()

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>Add and sort animals by species</div>
      <AddAnimal />
      {animals.length === 0 ?
        (<span className={styles.info_span}>No animals added yet.</span>) :
        (
          <>
            <div className={styles.filter_container}>
              <div className={styles.filter_option}>
                <span onClick={() => dispatch(setFilterSpecies(""))}>
                  All
                </span>
              </div>
              {allSpecies.map(species => (
                <div key={uuid()}
                  className={styles.filter_option}
                  onClick={() => dispatch(setFilterSpecies(species))}
                >
                  <span>
                    {species}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.animals_container}><Animal /></div>
          </>
        )
      }
    </div>

  )
}