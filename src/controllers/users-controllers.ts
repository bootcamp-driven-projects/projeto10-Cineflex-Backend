import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import user from "@/models/user";
import session from "@/models/session";
import { v4 as uuid } from "uuid";
import userMiddlewares from "@/middlewares/users-middlewares";

const userController = {
    register: async (req: Request, res: Response) => {
        if (res.headersSent) { 
            return;
        }
        try {
            await userMiddlewares.register(req, res);
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
            res.status(201).send({ response, message: "Usuário Registrado com Sucesso" });
        } catch (error) {
            console.error("Erro controller usuario\n" + error);
            if (!res.headersSent) {
                res.status(500).send({ error });
            }
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            
            await userMiddlewares.login(req, res);
    
            if (res.headersSent) {
                console.error('Middleware de validação já enviou uma resposta');
                return;
            }

            const { email, password } = req.body;
            const existingUser = await user.findOne({ email });
    
            if (!existingUser) {
                console.log('Email não cadastrado');
                return res.status(400).send({ message: "Email não cadastrado" });
            }
    
            const validPassword = await bcrypt.compare(password, existingUser.password);
    
            if (!validPassword) {
                console.log('Senha incorreta');
                return res.status(400).send({ message: "Senha incorreta" });
            }
    
            const token = uuid();
            const sessiondb = {
                token,
                userId: existingUser._id,
            };
    
            await session.create(sessiondb);
            return res.status(200).send({ token, message: "Login efetuado com sucesso" });
    
        } catch (error) {
            console.error("Erro controller usuario\n" + error);
            if (!res.headersSent) {
                return res.status(500).send({ error });
            }
        }
    }
    
    
      
}

export default userController;
