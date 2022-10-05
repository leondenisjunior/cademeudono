import { Button } from '@mui/material'
import Container from '../../../components/Container'
import styles from './adopt.module.css'

export default function Create() {
  return (
    <Container>
      <section>
        <div className={styles.wrapperButton}>
          <Button variant="contained">Cadastrar para adoção</Button>
        </div>
      </section>
    </Container>
  )
}
