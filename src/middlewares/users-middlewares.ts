import { Request, Response, NextFunction } from "express";
import user from "@/models/user";
import joi from "joi";

const userMiddlewares = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, checkpassword } = req.body;
            const schema = joi.object({
                email: joi.string().email().required(),
                name: joi.string().min(3).required(),
                password: joi.string().min(6).required(),
                checkpassword: joi.ref("password"),
            });
            
            const validationResult = schema.validate(req.body);
            if (validationResult.error) {
                return res.status(400).send({ message: validationResult.error.details[0].message });
            }
            
            const existingUser = await user.findOne({ email }); 
            if (existingUser) {
                return res.status(400).send({ message: "Email já cadastrado no sistema" });
            }

            if (!password) {
                return res.status(400).send({ message: "Senha é obrigatória." });
            }

            if (password !== checkpassword) {
                return res.status(400).send({ message: "Senhas não conferem" });
            }

            next();
        } catch (error) {
            console.error("Erro middleware usuário\n" + error);
            return res.status(500).send({ error, message: "Erro ao criar usuário" });
        }
    },
}

export default userMiddlewares;
