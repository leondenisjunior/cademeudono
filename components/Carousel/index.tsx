import { Button } from '@mui/material'
import Link from 'next/link'
import Card, { CardProps } from './Card'
import styles from './Carousel.module.css'

interface CarouselProps {
  data: CardProps[]
  title: string
}

function Carousel({ data, title }: CarouselProps): JSX.Element {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.wrapper}>
        {data.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
      <div className={styles.wrapperBUtton}>
        <Link href="/criarconta">
          <Button variant="contained">Ver mais</Button>
        </Link>
      </div>
    </section>
  )
}

export default Carousel
