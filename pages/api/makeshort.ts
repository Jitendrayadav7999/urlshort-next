import type { NextApiRequest, NextApiResponse } from 'next'
import shortid from "shortid"
import connectDb from '@/db/db'
import urlModel from '@/db/model/urlModel'


const isValid = function (value:any) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}
let urlRegex = "((http|https)://)(www.)?"
    + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]"
    + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"

    connectDb()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method ==="POST"){
        const {longUrl} = req.body
        if (!isValid(longUrl)) {
            return res.status(400).send({ status: false, message: "longUrl is required" })
        }
        if (!longUrl.match(urlRegex)) {
            return res.status(400).send({ status: false, message: "invalid Url" })
        }
        let findUrl = await urlModel.findOne({ longUrl: longUrl })
        if (findUrl) {
            return res.status(200).send({ status: true, message: "url already present", data: findUrl })
        }
        const urlCode:any = shortid.generate().toLowerCase()
        const shortUrl:any = `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}/api/${urlCode}`
        const saveData = {
            longUrl,
            urlCode,
            shortUrl
        }
       let result = await urlModel.create(saveData)
       console.log(result)
     return res.status(200).send({data :result})
    }
}