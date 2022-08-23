import styles from './local.module.css'

interface LocalProps {
  city: string
  district: string
  street: string
  number: number
}

const Local = (props: LocalProps) => {
  const { city, district, street, number } = props

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Local do desaparecimento</p>
      <ul>
        <li>
          <p>Cidade:</p>
          <span>{city}</span>
        </li>
        <li>
          <p>Bairro:</p>
          <span>{district}</span>
        </li>
        <li>
          <p>Rua:</p>
          <span>{street}</span>
        </li>
        <li>
          <p>Número:</p>
          <span>{number}</span>
        </li>
      </ul>
    </div>
  )
}

export default Local
