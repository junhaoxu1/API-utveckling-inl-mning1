import express from 'express'
import { index, show, store } from '../controllers/products_controller'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', index)

router.get('/:productId', show)

router.post('/', [
    body('name')
    .isLength({min: 1}).bail().withMessage("Not 1 Word")
    .isString().withMessage("Not a String"),

    body('price')
    .isLength({min: 1}),

    body('stock_quantity')
    .isLength({min: 1})
    
], store)

export default router