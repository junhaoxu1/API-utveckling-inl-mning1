import express from 'express'
import { index, show, store } from '../controllers/orders_controller'
import { body } from 'express-validator'
const router = express.Router()

router.get('/', index)

router.get('/:order_id', show)

router.post('/', [
    body('customer_first_name')
    .isString().withMessage("Not a String").bail()
    .isLength({min: 1}),

    body('customer_last_name')
    .isString().withMessage("Not a String").bail()
    .isLength({min: 1}),

    body('customer_address')
    .isString().withMessage("Not a String").bail()
    .isLength({min: 1}),

    body('customer_postcode')
    .isString().withMessage("Not a String").bail()
    .isLength({min: 1, max: 6}),

    body('customer_email')
    .isString().withMessage("Not a String").bail()
    .isLength({min: 1}).bail()
    .isEmail(),

    body('customer_phone')
    .optional().bail()
    .matches(/^\d+$/)
    .isString().withMessage("Not a String"),

    body('order_total')
    .isInt({min: 1}),

    body('order_items.*.product_id')
    .isLength({min: 1})
    .not().isString(),

    body('order_items.*.qty')
    .isInt({min: 1})
    .not().isString(),

    body('order_items.*.item_price')
    .isInt({min: 1})
    .not().isString(),

    body('order_items.*.item_total')
    .isInt({min: 1})
    .not().isString(),
],store)

export default router