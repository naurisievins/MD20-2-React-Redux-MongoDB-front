import styles from './AddAnimal.module.scss'
import { useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import { v4 as uuid } from 'uuid';
import { Animal } from "../../types/types";
import { useAddAnimalMutation } from '../../store/apiSlice';

export default function AddAnimal() {

  const initialAnimalObject: Animal = {
    _id: uuid(),
    name: '',
    imgLink: '',
    species: ''
  }

  const [showAddForm, setShowAddForm] = useState(false)
  const [invalidInput, setInvalidInput] = useState(false)
  const [showNewSpecies, setShowNewSpecies] = useState(false)
  const { allSpecies } = useAppSelector((state) => state.animals)
  const [animalObject, setAnimalObject] = useState(initialAnimalObject)
  const [addAnimal] = useAddAnimalMutation()

  const validateNameAndSpecies = (input: string) => {
    let result = input.trim().toLowerCase()
    if (result.match(/^[a-z]*$/)) {
      return true
    } else {
      setInvalidInput(true)
      return false
    }
  }

  const handleFormSubmit = () => {
    if (validateNameAndSpecies(animalObject.name) &&
      validateNameAndSpecies(animalObject.species)) {

      addAnimal(animalObject)

      setInvalidInput(false)
      setAnimalObject(initialAnimalObject)
      setShowAddForm(false)
      setShowNewSpecies(false)
    }
  }

  return (
    <>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Close form' : 'Add Animal'}
      </button>

      {showAddForm &&
        (<form className={styles.add_form}
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <label>
            <span>Name</span>
            <input value={animalObject.name}
              placeholder="Tiger..."
              onChange={(e) => setAnimalObject({ ...animalObject, name: e.target.value })}
              required
            />
          </label>

          <label>
            <span>Image source</span>
            <input value={animalObject.imgLink}
              placeholder="http://..."
              onChange={(e) => setAnimalObject({ ...animalObject, imgLink: e.target.value })}
              required
            />
          </label>

          <label>
            <div>
              <span>Species </span>
              <a onClick={() => Boolean(allSpecies.length) && setShowNewSpecies(!showNewSpecies)}
                className={styles.species_link}>
                (<u>
                  {showNewSpecies ? 'choose from dropdown' : 'add new species'}
                </u>)
              </a>
            </div>

            {(showNewSpecies || !Boolean(allSpecies.length)) && (
              <input value={animalObject.species}
                placeholder="Cat..."
                onChange={(e) => setAnimalObject({ ...animalObject, species: e.target.value })}
                required
              />
            )}
            {(Boolean(allSpecies.length) && !showNewSpecies) &&
              <select defaultValue=""
                value={animalObject.species}
                onChange={(e) => {
                  console.log(animalObject);
                  setAnimalObject({ ...animalObject, species: e.target.value })
                }}
                required
              >
                <option value="" disabled hidden>Choose species</option>
                {allSpecies.map(species => (
                  <option key={uuid()}
                    value={species}>
                    {species}
                  </option>
                ))}
              </select>
            }
          </label>
          <button>Add</button>

          {invalidInput && (
            <div className={styles.error_msg}>
              <b>Invalid input!</b> Please use only english letters for Name and Species.
            </div>
          )}
        </form>)
      }
    </>
  )
}