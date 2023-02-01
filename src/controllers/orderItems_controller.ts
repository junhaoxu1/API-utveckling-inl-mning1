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
    const orderItemId = Number(req.params.orderItemId)

    try {
        const orderItems = await prisma.orderItems.findUniqueOrThrow({
            where: {
                id : orderItemId,
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
    const orderItemId = Number(req.params.orderItemId)

    try {
        const orderItems = await prisma.orderItems.update({
            where: {
                id: orderItemId,
            },
            data: req.body,
        })

        return res.send(orderItems)

    } catch (err) {
        return res.status(500).send({ message: 'Something Went Wrong'})
    }
}

export const destroy = async (req: Request, res: Response) => {
    const orderItemId = Number(req.params.orderItemId)

    try {
        const orderItems = await prisma.orderItems.findUniqueOrThrow({
            where: {
                id: orderItemId,
            },
        })
        return res.send(orderItems)
    } catch (err) {
        return res.status(500).send({ message: 'Something went wrong when deleting the resource'})
    }
}