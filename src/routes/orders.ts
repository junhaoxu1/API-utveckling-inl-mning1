import express from 'express'
import { index, show, store } from '../controllers/orders_controller'
// import { body } from 'express-validator'
const router = express.Router()

router.get('/', index)

router.get('/:orderId', show)

router.post('/', store)

export default router