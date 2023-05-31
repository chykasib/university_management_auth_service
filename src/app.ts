import express, { Application, Request, Response, urlencoded } from 'express'
import cors from 'cors'
const app: Application = express()

app.use(cors())
// parser

app.use(express.json())
app.use(urlencoded({ extended: true }))
// testing route
app.get('/', (req: Request, res: Response) => {
  res.send('working successfully')
})

export default app
