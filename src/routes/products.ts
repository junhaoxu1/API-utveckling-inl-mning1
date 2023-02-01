import express from 'express'
import { index, show, store } from '../controllers/products_controller'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', index)

router.get('/productId', show)

router.post('/', [
    body('name')
    .isEmpty().bail()
    .isString().bail()
    .isLength({min: 2})
], store)

export default router