import { Request, Response } from "express";
import { bd } from "../database/connection";

export default class Jobs {
  static async create(req: Request, res: Response) {
    const job = req.body as Job;

    return await bd('jobs').insert(job).returning("id").then((r) => {
      console.log("Trabalho criado!!!");
      return res.status(200).json(r);
    }).catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
  };

  static async update(req: Request, res: Response) {
    const job = req.body as Job;

    if (job.id === undefined) {
      return res.status(400).json({ err: "Falta o ID" });
    }

    return await bd('jobs').update(job).where("id", job.id).returning("id").then((r) => {
      console.log("Trabalho atualizado!!!");
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

    return await bd('jobs').delete().where("id", id).returning("id").then((r) => {
      console.log("Trabalho deletado!!!");
      return res.status(200).json(r);
    }).catch((err) => {
      console.log(err);
      return 
    });
  };

  static async list(req: Request, res: Response) {
    const id = Number(req.query.id);
    const user = Number(req.query.user);

    if (isNaN(id) && isNaN(user)) {
      return await bd('jobs').select("*").then((r) => {
        console.log("Trabalhos listados!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    }else if(!isNaN(id) && isNaN(user)){
      return await bd('jobs').select("*")
      .where("id", id)
      .then((r) => {
        console.log("Trabalhos listado!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    }else if(isNaN(id) && !isNaN(user)){
      return await bd('jobs').select("*")
      .where("user", user)
      .then((r) => {
        console.log("Trabalhos listado!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    };

    return await bd('jobs').select("*")
    .where("user", user).andWhere("id", id)
    .first().then((r) => {
      console.log("Trabalho listado!!!");
      return res.status(200).json(r);
    }).catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
  };
}