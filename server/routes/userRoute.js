import express from 'express'
import { createUser ,bookVisit,getAllBooking,cancelBooking,toFab,getAllFavourites} from '../controllers/userCntrl.js'
import jwtCheck from '../config/auth0Config.js'
const router=express.Router()

router.post("/register",jwtCheck,createUser)
router.post("/bookVisit/:id",bookVisit)
router.post("/allBookings",getAllBooking)
router.post("/removeBooking/:id",cancelBooking)
router.post("/toFab/:rid",toFab)
router.post("/allFav",getAllFavourites)

export {router as userRoute}