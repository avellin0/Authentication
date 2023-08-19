import { Request, Response } from "express";
import { Client } from "../database/prisma_client";

export class Creat_Rules {
    async handle(req: Request, res: Response) {


        const { username,password} = req.params;

        const valid = await Client.user.findMany({
            where: {
                username
            }
        })

        const pass = await Client.user.findMany({
            where: {
                password
            }
        })

        if (valid && pass) {
            console.log("Usuario já cadastrado");
            return res.json(valid)
        }else{
            return new Error("User not authorized!")                
        }


    }
}