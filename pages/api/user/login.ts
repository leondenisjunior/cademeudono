// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { buildClient } from '@datocms/cma-client-node'
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.query
    if (!email || !password) {
      return res.status(400).json({ message: 'Parâmetros inválidos' })
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
        password
      }
    })
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(400).json({ message: 'E-mail ou senha inválido' })
  } catch (error) {
    console.error('error', error)
    return res.status(500).json({ message: 'Ocorreu um erro' })
  }
}
