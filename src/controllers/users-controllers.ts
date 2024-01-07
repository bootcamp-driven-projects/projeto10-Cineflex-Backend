import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import user from "@/models/user";
import userMiddlewares from "@/middlewares/users-middlewares";

const userController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) { 
            return;
        }
        try {
            await userMiddlewares.create(req, res, next);
            if (res.headersSent) {
                return;
            }
            const salt = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const userdb = {
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
            };
            const response = await user.create(userdb);
            return res.status(201).send({ response, message: "Usuário Registrado com Sucesso" });
        } catch (error) {
            console.error("Erro controller usuario\n" + error);
            if (!res.headersSent) {
                return res.status(500).send({ error });
            }
        }
    },
}

export default userController;
