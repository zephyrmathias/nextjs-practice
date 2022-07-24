import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'NOT ALLOWED' })
  }

  const contactData = JSON.parse(req.body)

  const savedContact = await prisma.contact.create({
    data: contactData
  })

  res.status(200).json(savedContact)
}