import express from 'express'
const router=express.Router()
import { createResidency,getAllResidencies, getResidency } from '../controllers/resdCntrl.js'

router.post("/create",createResidency)
router.get("/allresd",getAllResidencies)
router.get("/:id",getResidency)

export {router as residencyRoute}