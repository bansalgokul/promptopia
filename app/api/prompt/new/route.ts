import { NextApiRequest, NextApiResponse } from "next"

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const { userId, prompt, tag } = await req.body.json()
}
