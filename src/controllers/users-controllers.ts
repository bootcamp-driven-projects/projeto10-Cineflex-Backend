import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import user from "@/models/user";
import userMiddlewares from "@/middlewares/users-middlewares";

const userController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userMiddlewares.create(req, res, next);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.senha, salt);
            const usuario = {
                nome: req.body.nome,
                matricula: req.body.matricula,
                senha: hashedPassword,
                telefone: req.body.telefone,
                email: req.body.email,
                user_image: req.body.user_image,
                role: req.body.role,
            };
            const response = await user.create(usuario);
            res.status(201).json({ response, message: "Usuário Registrado com Sucesso" });
        } catch (error) {
            res.status(500).json({ error, message: "Login Já Cadastrado no Sistema" });
            console.log("Erro controller usuario\n" + error);
        }
    },
}
    
export default userController;