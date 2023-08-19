import { Request, Response } from 'express'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Client } from '../database/prisma_client';


export const SignIn = async (req: Request, res: Response) => {

    try {


        const { username, password } = req.body;

        const usuario = await Client.user.findUnique({
            where: {
                username
            },
            include: {
                User_permission: {
                    select: {
                        permission: true
                    }
                }
            }
        })

        if (!usuario) {
            return res.status(401).json({ message: "Usuario não cadastrado" })
        }

        const truPass = await compare(password, usuario.password)

        if (!truPass) {
            return res.status(400).json({ message: "senha inválida" })
        }

        const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

        if (!MY_SECRET_KEY) {
            return res.status(400).json({ message: "chave não encontrada" })
        }

        const token = sign({
            userId: usuario.id,
            roles: usuario.User_permission,
        }, MY_SECRET_KEY,
            {
                algorithm: "HS256",
                expiresIn: "1h"
            }
        )

        return res.status(200).json(token)

    } catch (error) {
        return res.status(400).json(error)
    }
}

