import React, { FC, useEffect } from 'react'
import Carousel from '../components/Carousel'
import Container from '../components/Container'
import { campanha, desaparecidos, estaoParaAdocao } from './mock'

const Home: FC = () => {
  useEffect(() => {
    fetch('/api/hello').then((el) => console.log(el))
  }, [])
  return (
    <Container>
      <>
        <Carousel
          data={desaparecidos}
          title="Aqui estão alguns desaparecidos:"
        />
        <Carousel data={estaoParaAdocao} title="Para adoção" />
        <Carousel data={campanha} title="Algumas campanhas importantes:" />
        <Carousel
          data={desaparecidos}
          title="Aqui estão alguns desaparecidos:"
        />
      </>
    </Container>
  )
}

export default Home
