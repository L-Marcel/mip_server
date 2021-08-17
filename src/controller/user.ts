import { Request, Response } from "express";
import { bd } from "../database/connection";
import UserValidation from "../validations/user";
import validations from "../validations/config/messages";

export default class Users {
    static async check(req: Request, res: Response) {
        let user: User = req.body;
        let rt = req.params.rt;
        rt = (rt === "create" || rt === "update") ? rt : "create";

        UserValidation.check(rt as "create" | "update")
            .validateAsync(user, {
                abortEarly: false,
                messages: validations.config.messages,
            }).then((res) => {
                return res.status(200).send([]);
            }).catch((err) => {
                return res.status(200).send(err.details);
            });

    };

    static async login(req: Request, res: Response) {
        const user = req.body as Credentials;

        if (user.email === undefined || user.password === undefined) {
            return res.status(400).json({ err: "Credenciais inválidas" });
        }

        await bd('users').select("id", "name", "email", "phone")
            .where("email", user.email)
            .andWhere("password", user.password)
            .first()
            .then((r) => {
                if (r !== undefined) {
                    return res.status(200).json(r);
                } else {
                    return res.status(400).json({ err: "Credenciais inválidas" });
                }
            }).catch((err) => {
                console.log(err);
                return res.status(400).json({ err: "Credenciais inválidas" });
            });
    };

    static async create(req: Request, res: Response) {
        const user = req.body as User;
        let validation = await UserValidation.check("create")
            .validateAsync(user, {
                abortEarly: false,
                messages: validations.config.messages,
            }).then((res) => {
                return [res, true];
            }).catch((err) => {
                return [err, false];
            });

        if (!validation[1]) {
            return res.status(400).send(validation[0].details);
        };

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
        let validation = await UserValidation.check("update")
            .validateAsync(user, {
                abortEarly: false,
                messages: validations.config.messages,
            }).then((res) => {
                return [res, true];
            }).catch((err) => {
                return [err, false];
            });

        if (!validation[1]) {
            return res.status(400).send(validation[0].details);
        };


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
            bd('user_users').delete().where("user", id);
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

