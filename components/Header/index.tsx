import React, { FC, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import styles from './Header.module.css'
import Container from '../Container'
import classNames from 'classnames'
import { Button } from '@mui/material'

const routes = [
  {
    route: '/',
    name: 'Página principal',
  },
  {
    route: '/adotar',
    name: 'Adotar',
  },
  {
    route: '/encontrar',
    name: 'Encontrar',
  },
  {
    route: '/campanha',
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

  const path = typeof window != 'undefined' ? window.location.pathname : ''

  useEffect(() => {
    setPathname(path)
  }, [path])

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
            <li>
              <Button variant="contained">Criar conta</Button>
            </li>
            <li>
              <Button variant="outlined">Fazer login</Button>
            </li>
          </ul>
          <MenuIcon className={styles.hamburger} onClick={handleMenu} />
        </nav>
      </Container>
    </header>
  )
}

export default Header
