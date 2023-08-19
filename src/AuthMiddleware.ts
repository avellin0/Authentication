import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Client } from "./database/prisma_client";


interface tokendecodificado {
    userId: string
}

export function AuthMiddleware(permission?: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const headersAuth = req.headers.authorization;

        if (!headersAuth || !headersAuth.startsWith('Bearer ')) {
            return res.status(401).json({ message: "token não fornecido!" })
        }

        const token = headersAuth.substring(7)

        try {
            const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

            if (!MY_SECRET_KEY) {
                return res.status(400).json({ message: "chave não encontrada" })
            }

            const tokenDecodificado = verify(token, MY_SECRET_KEY) as tokendecodificado

            req.user = { id: tokenDecodificado.userId }

            if (permission) {
                const user = await Client.user.findUnique({
                    where: {
                        id: tokenDecodificado.userId
                    },
                    include: {
                        User_permission: {
                            select: {
                                permission: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                })

                const userPermission = user?.User_permission.map((na) => na?.permission.name) ?? []
                const hasPermission = permission.some((p) => userPermission.includes(p))

                if (!hasPermission) {
                    return res.status(403).json({ message: "acesso negado" })
                }
            }

            next()

        } catch (error) {
            return res.status(400).json(error)
        }
    }
}