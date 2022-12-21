// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import users from "../../celebrities.json"

type Data = {
  "id": number,
		"first": string,
		"last": string,
		"dob": string,
		"gender": string,
		"email": string,
		"picture":string,
		"country": string,
		"description": string
}[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(users)
}
