import express from "express"
// import orderItems from './orderItems'
import products from './products'
// import orders from './orders'
import resource from './_router'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

router.use('/products', products)

// router.use('/orderItems', orderItems)

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resource)

export default router
