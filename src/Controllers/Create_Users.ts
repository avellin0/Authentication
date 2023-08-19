/* The `createUser` class handles the creation of a new user in a database using Express and Prisma. */

import { Request, Response } from "express";
import { Client } from "../database/prisma_client";

export class createUser {
    async handle(req: Request, res: Response) {

        const { username, password, AccessName } = req.body;

        const local = await Client.user.create({
            data: {
                username,
                password,
                User_permission: {
                  
                }
            }

        })

        return res.status(200).json(local)



    }
}
