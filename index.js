import express from "express"
import cors from "cors"
import { router } from './routes/filtered-responses.js'
import 'dotenv/config';

const app = express()


app.use(cors())
app.use('/v1/api/forms',router)
app.listen(3000, () => console.log("Server listening on port 3000"))