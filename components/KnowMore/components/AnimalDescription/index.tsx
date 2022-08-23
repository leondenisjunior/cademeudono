import styles from './animalDescription.module.css'

interface props {
  name: string
  sex: string
}

const AnimalDescription = ({ name, sex }: props) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Sobre</p>
      <ul>
        <li>
          <p>Nome:</p>
          <span>{name}</span>
        </li>
        <li>
          <p>Sexo:</p>
          <span>{sex}</span>
        </li>
      </ul>
    </div>
  )
}

export default AnimalDescription
