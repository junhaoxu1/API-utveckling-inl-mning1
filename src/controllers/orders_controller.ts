import { Request, Response } from 'express'
import prisma from '../prisma'
import { validationResult } from 'express-validator'

export const index = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany()

        res.send({
            status: 'success',
            data: orders,
        })

    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Something went wrong' })
    }
}

export const show = async (req: Request, res: Response) => {
    const orderId = Number(req.params.orderId)

    try {
        const order = await prisma.order.findUniqueOrThrow({
            where: {
                id: orderId,
            },

            include: {
                order_items : true,
            }
        })

        res.send({
            status: 'Success',
            data: order,
        })

    } catch (err) {
        return res.status(404).send({ status: 'error', message: 'Not Found' })
    }
}

export const store = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: 'Fail',
            data: validationErrors.array(),
        })
    }
    const products = req.body.order_items 

    try {
        const order = await prisma.order.create({
            data: {
                customer_first_name: req.body.customer_first_name,
                customer_last_name:  req.body.customer_last_name,
                customer_address:    req.body.customer_address,  
                customer_city:       req.body.customer_city,
                customer_postcode:   req.body.customer_postcode,    
                customer_email:      req.body.customer_email,
                customer_phone:      req.body.customer_phone,
                order_total:         req.body.order_total,

                order_items: {
                    createMany: {
                        data: products,
                    },
                },
            },
            include: {
                order_items: true,
            }
        })

        res.send({
            status: 'Success',
            data: order,
        })

    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Something Went Wrong' })
    }
}