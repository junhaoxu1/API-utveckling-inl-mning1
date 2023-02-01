import { Request, Response } from 'express'
import prisma from '../prisma'

export const index = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()

        res.send({
            status: 'success',
            data: products,
        })

    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Something went wrong' })
    }
}

export const show = async (req: Request, res: Response) => {
    const productId = Number(req.params.productId)

    try {
        const product = await prisma.product.findUniqueOrThrow({
            where: {
                id: productId,
            },
            include: {
                order: true,
                orderItems: true,
            }
        })
        res.send({
            status: 'Success',
            data: product,
        })

    } catch (err) {
        return res.status(404).send({ status: 'error', message: 'Not Found' })
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.create({
            data: {
                name:           req.body.name,  
                description:    req.body.description,
                price:          req.body.price,  
                images:         req.body.images,
                stock_status:   req.body.stock_status,
                stock_quantity: req.body.stock_quantity,
            }
        })
        res.send({
            status: 'Success',
            data: product,
        })

    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Something Went Wrong' })
    }
}