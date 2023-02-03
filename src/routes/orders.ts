import express from 'express'
import { index, show, store } from '../controllers/orders_controller'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', index)

router.get('/:orderId', show)

router.post('/', [
    body('customer_first_name')
    .isString().bail()
    .isLength({min: 1}),
    body('customer_last_name')
    .isString().bail()
    .isLength({min: 1}),
    body('customer_address')
    .isString().bail()
    .isLength({min: 1}),
    body('customer_postcode')
    .isString().bail()
    .isLength({min: 1, max: 6}),
    body('customer_email')
    .isString().bail()
    .isLength({min: 1}).bail()
    .isEmail(),
    body('order_total')
    .isLength({min: 1}),

    body('product_id')
    .isLength({min: 1}),
    body('qty')
    .isLength({min: 1}),
    body('item_price')
    .isLength({min: 1}),
    body('item_total')
    .isLength({min: 1})
],store)

export default router