import Card, { CardProps } from './Card'
import styles from './Carousel.module.css'

interface CarouselProps {
  data: CardProps[]
  title: string
}

function Carousel({ data, title }: CarouselProps): JSX.Element {
  return (
    <section>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.wrapper}>
        {data.map((item) => (
          <Card {...item} />
        ))}
      </div>
    </section>
  )
}

export default Carousel
