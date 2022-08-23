import React, { FC } from 'react'
import styles from './KnowMore.module.css'
import AnimalDescription from './components/AnimalDescription'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import Contato from './components/Contact'
import Local from './components/Local'
import Description from './components/Description'

const KnowMore: FC = () => {
  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true,
  }

  const images = [
    'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  ]
  return (
    <div>
      <div className={styles.containerSlider}>
        <div className={styles.wrapperSlide}>
          <Slide {...zoomOutProperties}>
            {images.map((image) => (
              <div className={styles.eachSlideEffect}>
                <div
                  style={{ borderRadius: 15, backgroundImage: `url(${image})` }}
                />
              </div>
            ))}
          </Slide>
        </div>
      </div>
      <h2 className={styles.title}>Desaparecido</h2>
      <div className={styles.wrapper}>
        <AnimalDescription name="Juma" sex="Macho" />
        <Local
          city="Uberlândia"
          district="Luizote"
          number={121}
          street="Francico ribeiro"
        />
        <Contato fone="34 898888172" name="34 898888172" />
        <Description
          data="is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a
        type specimen book. It has survived not only five centuries, but also
        the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum."
        />
      </div>
    </div>
  )
}

export default KnowMore
