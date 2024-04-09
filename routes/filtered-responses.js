import { Router } from "express"
import { getFilteredResponses } from "../controllers/filtered-responses.js"

export const router = Router()

router.get("/:formId/filteredResponses", getFilteredResponses)
