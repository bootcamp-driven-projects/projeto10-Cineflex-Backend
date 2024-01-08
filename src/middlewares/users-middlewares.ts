import { Request, Response, NextFunction } from "express";
import user from "@/models/user";
import joi from "joi";
import bcrypt from "bcrypt";    
import { signInSchema } from "@/schemas/users-schemas";

const userMiddlewares = {
    register: async (req: Request, res: Response) => {
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

        
        } catch (error) {
            console.error("Erro middleware usuário\n" + error);
            return res.status(500).send({ error, message: "Erro ao criar usuário" });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
           
            const { email, password } = req.body;
            const validationResult = signInSchema.validate(req.body);
    
            if (validationResult.error) {
                console.log('Erro de validação:', validationResult.error.details[0].message);
                return res.status(400).send({ message: validationResult.error.details[0].message });
            }
    
            const existingUser = await user.findOne({ email });
    
            if (!existingUser) {
                console.log('Email não cadastrado no sistema');
                return res.status(400).send({ message: "Email não cadastrado no sistema" });
            }
    
            const validPassword = await bcrypt.compare(password, existingUser.password);
    
            if (!validPassword) {
                console.log('Email ou senha incorretos');
                return res.status(400).send({ message: "Email ou senha incorretos" });
            }
    
        } catch (error) {
            console.error("Erro middleware usuário\n" + error);
            return res.status(500).send({ error, message: "Erro ao fazer login" });
        }
    },
}

export default userMiddlewares;
