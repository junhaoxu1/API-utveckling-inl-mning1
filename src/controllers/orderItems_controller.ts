import { Request, Response } from 'express'
import prisma from '../prisma'

export const index = async (req: Request, res: Response) => {
    try {
        const orderItmes = await prisma.orderItmes.findMany()
        res.send(orderItmes)
    } catch (err) {
        res.status(500).send({message : 'Something Went Wrong'})
    }
}

export const show = async (req: Request, res: Response) => {
    const productId = Number(req.params.productId)

    try {
        const orderItems = await prisma.orderItems.findUniqueOrThrow({
            where: {
                id : productId,
            },
            include: {
                product: true,
            }
        })
        return res.send(orderItems)
    } catch (err) {
        return res.status(404).send({message: 'Not Found'})
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const orderItems = await prisma.orderItems.create({
            data: {
                product_id: req.body.product_id,  
                qty       : req.body.qty,
                item_price: req.body.item_price,        
                item_total: req.body.item_total,
            }
        })
        return res.send(orderItems)

    } catch (err) {
        return res.status(500).send({ message: 'Something Went Wrong'})
    }
}

export const update = async (req: Request, res: Response) => {
    const productId = Number(req.params.productId)

    try {
        const orderItems = await prisma.orderItems.update({
            where: {
                id: productId,
            },
            data: req.body,
        })

        return res.send(orderItems)

    } catch (err) {
        return res.status(500).send({ message: 'Something Went Wrong'})
    }
}