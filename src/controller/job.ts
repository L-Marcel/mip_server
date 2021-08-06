import { Request, Response } from "express";
import { bd } from "../database/connection";

export default class Jobs {
  static async create(req: Request, res: Response) {
    const { job, user_id } = req.body as { job: Job, user_id: number };

    return await bd('jobs').insert(job).returning("id").then(async(r) => {
      return await bd('user_jobs').insert({
        job: r[0],
        user: user_id,
      }).then((r) => {
        console.log("Trabalho criado!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });;
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

    return await bd('jobs').delete().where("id", id).returning("id").then(async(r) => {
      return await bd('user_jobs').delete().where("job", id).returning("id").then((r) => {
        console.log("Trabalho deletado!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    }).catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
  };

  static async list(req: Request, res: Response) {
    const id = Number(req.query.id);
    const user_id = Number(req.query.user_id);

    if (isNaN(id) && isNaN(user_id)) {
      return await bd('jobs').join('user_jobs', 'jobs.id', 'user_jobs.job').select("jobs.*", "user_jobs.user").then((r) => {
        console.log("Trabalhos listados!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    }else if(!isNaN(id) && isNaN(user_id)){
      return await bd('jobs').join('user_jobs', 'jobs.id', 'user_jobs.job')
      .select("jobs.*", "user_jobs.user")
      .where("jobs.id", id)
      .then((r) => {
        console.log("Trabalhos listado!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    }else if(isNaN(id) && !isNaN(user_id)){
      return await bd('jobs').join('user_jobs', 'jobs.id', 'user_jobs.job')
      .select("jobs.*", "user_jobs.user")
      .where("user_jobs.user", user_id)
      .then((r) => {
        console.log("Trabalhos listado!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    };

    return await bd('jobs').join('user_jobs', 'jobs.id', 'user_jobs.job')
    .select("jobs.*", "user_jobs.user")
    .where("user_jobs.user", user_id).andWhere("jobs.id", id)
    .first().then((r) => {
      console.log("Trabalho listado!!!");
      return res.status(200).json(r);
    }).catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
  };
}