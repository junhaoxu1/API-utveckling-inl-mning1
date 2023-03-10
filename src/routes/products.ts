import express from 'express'
import { index, show, store } from '../controllers/products_controller'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', index)

router.get('/:product_id', show)

router.post('/', [
    body('name')
    .isLength({min: 1}).bail().withMessage("It's empty")
    .isString().withMessage("Not a String"),

    body('price')
    .isInt({min: 1}).withMessage("Add a Price"),

    body('description')
    .isLength({min: 1}).bail()
    .isString(),

    body('images')
    .isObject(),

    body('stock_status')
    .isLength({min: 1}).bail()
    .isString(),

    body('stock_quantity')
    .isInt()


], store)

export default router