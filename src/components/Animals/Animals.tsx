import styles from './Animals.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setFilterSpecies, setSpecies } from '../../store/animalSlice'
import Animal from '../Animal/Animal'
import AddAnimal from '../AddAnimal/AddAnimal'
import { v4 as uuid } from 'uuid'
import { useGetAnimalsQuery } from '../../store/apiSlice'
import filterSpecies from '../../assets/util/filterSpecies'
import validateSpecies from '../../assets/util/validateSpecies'
import { useEffect } from 'react'

export default function Animals() {

  const dispatch = useAppDispatch()
  const { data: animalsData, error, isLoading } = useGetAnimalsQuery()

  useEffect(() => {
    if (animalsData) {
      let speciesArr = filterSpecies(animalsData)
      speciesArr = speciesArr.map(ele => validateSpecies(ele))
      dispatch(setSpecies(speciesArr))
    }
  }, [animalsData])

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>Add and sort animals by species</div>
      <AddAnimal />
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>Error loading data.</h3>}
      {(animalsData && animalsData.length === 0) ?
        (<span className={styles.info_span}>No animals added yet.</span>) :
        (
          <>
            <div className={styles.filter_container}>
              <div className={styles.filter_option}>
                <span onClick={() => dispatch(setFilterSpecies(null))}>
                  All
                </span>
              </div>
              {animalsData && filterSpecies(animalsData).map(species => (
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