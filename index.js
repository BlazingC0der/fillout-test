import express from "express"
import cors from "cors"
import { router } from './routes/filtered-responses.js'
import 'dotenv/config';

const app = express()

const port = process.env.PORT || 3000;

app.use(cors())
app.use('/v1/api/forms',router)
app.listen(port, () => console.log("Server listening on port 3000"))
