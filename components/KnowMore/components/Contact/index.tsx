import styles from './contact.module.css'

interface contactProps {
  name: string
  fone: string
}

const Contato = (props: contactProps) => (
  <div className={styles.wrapper}>
    <p className={styles.title}>Contato</p>
    <ul>
      <li>
        <p>Nome:</p>
        <span>{props.name}</span>
      </li>
      <li>
        <p>Telefone:</p>
        <span>{props.fone}</span>
      </li>
    </ul>
  </div>
)
export default Contato
