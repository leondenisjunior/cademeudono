import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import upload from '../../../utils/upload'
import prisma from '../../../prisma'

const create = nextConnect()

create.use(upload.array('files', 4))

create.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let pet
    if (req.body?.pet) {
      pet = JSON.parse(req.body.pet)
    }

    const { title, description, idUser } = req.body

    if (!title || !description || !pet?.name || !idUser) {
      return res.status(400).json({ message: 'Parâmetros inválidos' })
    }
    if (req?.files) {
      pet.images = req.files.map((file) => file.location)
    }

    const petCreated = await prisma.pet.create({
      data: {
        name: pet.name,
        age: Number(pet?.age),
        images: pet?.images,
        description: pet?.description,
        specie: pet?.specie,
      },
    })
    const adoptCreate = await prisma.adopt.create({
      data: {
        title,
        description,
        petId: petCreated.id,
        userId: Number(idUser),
      },
    })
    res.status(200).json(adoptCreate)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Ocorreu um erro!' })
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default create
