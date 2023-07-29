import { Request, Response } from "express";
import { Client } from "../database/prisma_client";

export class WhereYouFrom {
    async handle(req: Request, res: Response) {
        const { country, city, neighborhood } = req.body;

        const local = await Client.cities.create({
            data:{
                country,
                city,
                neighborhood
            }
        })

        return res.json(local)
    }
}