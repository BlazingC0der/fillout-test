import { Router } from "express"
import { getFilteredResponses } from "../controllers/filtered-responses.js"

export const router = Router()

router.get("/:formId/filteredResponses", getFilteredResponses)
router.get("/",(req,res) => { res.sendStatus(200) })
