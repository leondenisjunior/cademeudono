import styles from './Description.module.css'

interface descriptionProps {
  data: string
}

const Description = (props: descriptionProps) => (
  <div className={styles.wrapper}>
    <p className={styles.title}>Descrição</p>
    <ul>
      <li>
        <span>{props.data}</span>
      </li>
    </ul>
  </div>
)
export default Description
