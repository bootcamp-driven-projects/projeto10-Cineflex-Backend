import { Request, Response, NextFunction } from "express";
import user from "@/models/user";
import joi from "joi";

const userMiddlewares = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, name, password, checkpassword } = req.body;
            const response = await user.findOne({ email });
            if (response) {
                res.status(400).json({ message: "Email já cadastrado no sistema" });
            }
            if (password !== checkpassword) {
                res.status(400).json({ message: "Senhas não conferem" });
            }
            const schema = joi.object({
                email: joi.string().email().required(),
                name: joi.string().min(3).required(),
                password: joi.string().min(6).required(),
                checkpassword: joi.ref("password"),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message });
            }
            next();
        } catch (error) {
            res.status(500).json({ error, message: "Erro ao criar usuário" });
            console.log("Erro middleware usuário\n" + error);
        }
    },
}


export default userMiddlewares;