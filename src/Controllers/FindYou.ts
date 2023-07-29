import { Request, Response } from "express";
import { Client } from "../database/prisma_client";

export class FindYou {
    async handle(req: Request, res: Response) {
        const {country} = req.params;

        const local = await Client.cities.findMany({
            where:{
                country
            },
        })

        return res.json(local)
    }
}