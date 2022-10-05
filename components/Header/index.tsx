import React, { FC, useContext, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import styles from './Header.module.css'
import Container from '../Container'
import classNames from 'classnames'
import { Button } from '@mui/material'
import Link from 'next/link'
import { UserContext } from '../../context'

const INITIAL_ROUTES = [
  {
    route: '/',
    name: 'Página principal',
  },
  {
    route: '/adotar',
    name: 'Adotar',
  },
  {
    route: '/desaparecidos',
    name: 'Desaparecidos',
  },
  {
    route: '/campanhas',
    name: 'Campanhas',
  },
  {
    route: '/meusposts',
    name: 'Meus posts',
  },
]

const Header: FC = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [pathname, setPathname] = useState('')
  const [routes, setRoutes] = useState(INITIAL_ROUTES)
  const { user, logout } = useContext(UserContext)

  const path = typeof window != 'undefined' ? window.location.pathname : ''

  useEffect(() => {
    setPathname(path)
  }, [path])

  // useEffect(() => {
  //   console.log('passou 2')

  //   if (!user.isLogged) {
  //     setRoutes((el) => el.filter((route) => route.name !== 'Meus posts'))
  //   }
  // }, [user.isLogged])

  const handleMenu = () => {
    setIsNavExpanded(!isNavExpanded)
  }

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.wrepperTitle}>
            <img className={styles.logo} src="logo.png" />
            <h1>Cadê meu dono</h1>
          </div>
          <ul className={isNavExpanded ? styles.listMobile : styles.list}>
            {routes.map(({ route, name }) => {
              const linkClasses = classNames(
                styles.link,
                pathname === route ? styles.linkSelected : null
              )
              return (
                <li key={route}>
                  <a className={linkClasses} href={route}>
                    {name}
                  </a>
                </li>
              )
            })}
            {user.isLogged ? (
              <li>
                <Button onClick={() => logout()} variant="outlined">
                  Sair
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/criarconta">
                    <Button variant="contained">Criar conta</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/login">
                    <Button variant="outlined">Fazer login</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <MenuIcon className={styles.hamburger} onClick={handleMenu} />
        </nav>
      </Container>
    </header>
  )
}

export default Header
