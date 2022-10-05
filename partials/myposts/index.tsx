import { Button } from '@mui/material'
import Link from 'next/link'
import React, { useContext } from 'react'
import Container from '../../components/Container'
import { UserContext } from '../../context'
import CreateAccount from '../createaccount'
import styles from './myposts.module.css'

export default function MyPosts() {
  const { user } = useContext(UserContext)

  if (!user.isLogged) {
    return <CreateAccount title="Crie uma conta para cadastrar seus posts" />
  }

  return (
    <Container>
      <section>
        <div className={styles.wrapperButton}>
          <Link href="/cadastrapost">
            <Button variant="contained">Cadastrar posts</Button>
          </Link>
        </div>
      </section>
    </Container>
  )
}
