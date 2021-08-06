import { Request, Response } from "express";
import { bd } from "../database/connection";

export default class Users {
    static async login(req: Request, res: Response){
        const user = req.body as Credentials;

        if (user.email === undefined || user.password === undefined) {
            return res.status(400).json({ err: "Credenciais inválidas" });
        }

        await bd('users').select("id","name","email","phone")
        .where("email", user.email)
        .andWhere("password", user.password)
        .first()
        .then((r) => {
            if(r !== undefined){
                return res.status(200).json(r);
            }else{
                return res.status(400).json({ err: "Credenciais inválidas" });
            }
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({ err: "Credenciais inválidas" });
        });
    };

    static async create(req: Request, res: Response) {
        const user = req.body as User;

        return await bd('users').insert(user).then((r) => {
            console.log("Usuário criado!!!");
            return res.status(200).json(r);
        }).catch((err) => {
            console.log(err);
            return res.status(400).json(err);
        });
    };

    static async update(req: Request, res: Response) {
        const user = req.body as User;
       

        if (user.id === undefined) {
            return res.status(400).json({ err: "Falta o ID" });
        }

        return await bd('users').update(user).where("id", user.id).then((r) => {
            console.log("Usuário atualizado!!!");
            return res.status(200).json(r);
        }).catch((err) => {
            console.log(err);
            return res.status(400).json(err);
        });
    };

    static async delete(req: Request, res: Response) {
        const id = Number(req.query.id);

        if (isNaN(id)) {
            return res.status(400).json({ err: "Falta o ID" });
        }

        return await bd('users').delete().where("id", id).then((r) => {
            bd('user_jobs').delete().where("user", id);
            console.log("Usuário deletado!!!");
            return res.status(200).json(r);
        }).catch((err) => {
            console.log(err);
            return res.status(400).json(err);
        });
    };

    static async list(req: Request, res: Response) {
        const id = Number(req.query.id);

        if (isNaN(id)) {
            return await bd('users').select("*").then((r) => {
                console.log("Usuários listados!!!");
                return res.status(200).json(r);
            }).catch((err) => {
                console.log(err);
                return res.status(400).json(err);
            });
        }

        return await bd('users').select("*").where("id", id)
            .first().then((r) => {
                console.log("Usuário listado!!!");
                return res.status(200).json(r);
            }).catch((err) => {
                console.log(err);
                return res.status(400).json(err);
            });
    };
}

