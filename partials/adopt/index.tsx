import { Button } from '@mui/material'
import Link from 'next/link'
import Container from '../../components/Container'
import styles from './adopt.module.css'

export default function Adopt() {
  return (
    <Container>
      <section>
        <div className={styles.wrapperButton}>
          <Link href="/meusposts">
            <Button variant="contained">Cadastrar para adoção</Button>
          </Link>
        </div>
      </section>
    </Container>
  )
}
