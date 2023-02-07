import { Request, Response } from 'express'
import prisma from '../prisma'
import { validationResult } from 'express-validator'

export const index = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()

        res.send({
            status: 'success',
            data: products,
        })

    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Cannot get products' })
    }
}

export const show = async (req: Request, res: Response) => {
    const product_id = Number(req.params.product_id)

    try {
        const product = await prisma.product.findUniqueOrThrow({
            where: {
                id: product_id,
            },
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
    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: 'Fail',
            data: validationErrors.array(),
        })
    }

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