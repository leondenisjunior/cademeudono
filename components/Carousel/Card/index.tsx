import { Button, Paper } from '@mui/material'
import Link from 'next/link'
import styles from './Card.module.css'

export interface CardProps {
  id: number
  author: {
    name: string
    city: string
  }
  image: string
  description: string
  publicationDate: string
}

function Card({
  id,
  author: { name, city },
  image,
  description,
  publicationDate,
}: CardProps): JSX.Element {
  return (
    <Paper className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.wrapperTitle}>
            <h2 className={styles.title}>{name}</h2>
            <span className={styles.subtitle}>{city}</span>
          </div>
          <img className={styles.img} src={image} />
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.wrapperFlex}>
          <span className={styles.subtitle}>{publicationDate}</span>
          <Link
            href={{
              pathname: '/detalhe',
              query: { id },
            }}
          >
            <Button variant="text">Saiba mais</Button>
          </Link>
        </div>
      </div>
    </Paper>
  )
}

export default Card
