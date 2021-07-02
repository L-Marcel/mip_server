import { Request, Response } from "express";
import { bd } from "../database/connection";

export default class Users {
    /**
   * Recebe um usuario no corpo da requisição e salva
   * ele no banco de dados
   * @param req - request (requisição)
   * @param res - response (resposta)
   * @returns - o ID do usuario criado
   */
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

    /**
     * Recebe um usuario no corpo da requisição que contem um ID
     * e atualiza o usuario com o mesmo ID dentro do banco de dados
     * @param req - request (requisição)
     * @param res - response (resposta)
     * @returns - o ID do usuario atualizado
     */
    static async update(req: Request, res: Response) {
        const user = req.body as User;
        console.log("Entrou no update");

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

    /**
     * Recebe um ID como query da requisição e deleta o 
     * usuario com o mesmo ID no banco de dados
     * @param req - request (requisição)
     * @param res - response (resposta)
     * @returns - o ID do usuario deletado
     */
    static async delete(req: Request, res: Response) {
        const id = Number(req.query.id);

        if (isNaN(id)) {
            return res.status(400).json({ err: "Falta o ID" });
        }

        return await bd('users').delete().where("id", id).then((r) => {
            console.log("Usuário deletado!!!");
            return res.status(200).json(r);
        }).catch((err) => {
            console.log(err);
            return res.status(400).json(err);
        });
    };

    /**
     * Lista todos os usuarios, pode receber um ID como query, nesse caso
     * ele irá retornar apenas um usuario.
     * @param req - request (requisição)
     * @param res - response (resposta)
     * @returns - o(s) usuario(s)
     */
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

