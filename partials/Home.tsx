import React, { FC } from 'react'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import Container from '../components/Container'
import Header from '../components/Header'

const desaparecidos = [
  {
    id: 1,
    author: {
      name: 'Fernanda',
      city: 'Uberlândia - MG',
    },
    image: 'dog.png',
    description:
      'isso e uma descrião do cachorro abandonado e ei isso e uma descrião do cachorro abandonado e eissio mao ser ssio mao ser isso e uma descrião do cachorro abandonado e eissio mao ser isso e uma descrião do cachorro abandonado e eissio mao ser',
    publicationDate: '12/06/20122',
  },
  {
    id: 2,
    author: {
      name: 'Fernanda',
      city: 'Uberlândia - MG',
    },
    image: 'dog.png',
    description: 'isso e uma descrião do cachorro abandonado e eissio mao ser',
    publicationDate: '12/06/20122',
  },
  {
    id: 3,
    author: {
      name: 'Fernanda',
      city: 'Uberlândia - MG',
    },
    image: 'dog.png',
    description: 'isso e uma descrião do cachorro abandonado e eissio mao ser',
    publicationDate: '12/06/20122',
  },
  {
    id: 4,
    author: {
      name: 'Fernanda',
      city: 'Uberlândia - MG',
    },
    image: 'dog.png',
    description: 'isso e uma descrião do cachorro abandonado e eissio mao ser',
    publicationDate: '12/06/20122',
  },
  {
    id: 5,
    author: {
      name: 'Fernanda',
      city: 'Uberlândia - MG',
    },
    image: 'dog.png',
    description: 'isso e uma descrião do cachorro abandonado e eissio mao ser',
    publicationDate: '12/06/20122',
  },
  {
    id: 6,
    author: {
      name: 'Fernanda',
      city: 'Uberlândia - MG',
    },
    image: 'dog.png',
    description: 'isso e uma descrião do cachorro abandonado e eissio mao ser',
    publicationDate: '12/06/20122',
  },
]

const Home: FC = () => {
  return (
    <Container>
      <Carousel data={desaparecidos} title="Aqui estão alguns desaparecidos:" />
    </Container>
  )
}

export default Home
