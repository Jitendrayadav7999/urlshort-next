import urlModel from '@/db/model/urlModel'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        let {urlCode} = req.query
            const findUrlLink = await urlModel.findOne({ urlCode })
            if (!findUrlLink) return res.status(404).send("<h1 >Url Not Found</h1>")
            return res.status(302).redirect(findUrlLink.longUrl)
    } catch (error:any) {
        return res.status(500).send({ status: false, error: error.message })
    }
}
