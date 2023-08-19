/* The above class handles a request to create a user permission in a TypeScript application using
Express and Prisma. */

import { Request, Response } from "express";
import { Client } from "../database/prisma_client";

export class WhatYourPermission {
    async handle(req: Request, res: Response) {
        const {user_id, permission_id} = req.body;
        
        const permission = await Client.user_permission.create({
            data:{
                user_id,
                permission_id
            }
        })

            return res.json(permission)
    }
}