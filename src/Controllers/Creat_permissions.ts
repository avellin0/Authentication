/* The `YourPermission` class handles a request to create a new permission in a database using the
Prisma client. */
import { Request, Response } from "express";
import { Client } from "../database/prisma_client";

export class CreatePermission {
    async handle(req: Request, res: Response) {
        const {name,description} = req.body;
        
        const permission = await Client.permission.create({
            data:{
                description,
                name
            }
        })

            return res.json(permission)
    }
}