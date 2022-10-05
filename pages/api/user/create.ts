import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Parâmetros inválidos' })
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    })
    if (user) {
      return res.status(400).json({ message: 'E-mail já cadastrado' })
    }
    const userSave = await prisma.user.create({
      data: {
        email,
        name,
        password
      },
    })

    return res.status(200).json(userSave)
  } catch (error) {
    console.error('error', error)
    return res.status(500).json({ message: 'Ocorreu um erro' })
  }
}
