// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { buildClient } from '@datocms/cma-client-node'
import type { NextApiRequest, NextApiResponse } from 'next'
import sendergrid from '@sendgrid/mail'

export default async function resetpassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.query
    if (!email) {
      return res.status(400).json({ message: 'Parâmetros inválidos' })
    }

    const client = buildClient({ apiToken: `${process.env.API_TOKEN}` })
    const user = await client.items.list({
      filter: {
        type: 'user',
        fields: {
          email: {
            eq: email,
          },
        },
      },
    })

    if (user.length) {
      const newpassword = getRandomArbitrary(11111, 99999).toFixed()
      await sendMail(user[0].email, newpassword)
      await client.items.update(user[0].id, {
        password: newpassword,
      })
      res
        .status(200)
        .json({ message: 'Enviamos uma nova senha para o seu e-mail.' })
      return
    }
    return res.status(200).json({ message: 'E-mail não está cadastrado.' })
  } catch (error) {
    console.error('error', error)
    return res.status(500).json({ message: 'Ocorreu um erro' })
  }
}

function getRandomArbitrary(min: any, max: any) {
  return Math.random() * (max - min) + min
}

const sendMail = async (email: string, newpassword: string) => {
  sendergrid.setApiKey(
    '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'
  )

  const msg = {
    to: email, // Change to your recipient
    from: 'cademeudononoreply@gmail.com', // Change to your verified sender
    subject: 'Cademeudono nova senha',
    text: `Aqui está a sua nova senha: ${newpassword}`,
  }

  sendergrid
    .send(msg)
    .then(() => {})
    .catch((error) => {
      console.error(error)
    })
}
