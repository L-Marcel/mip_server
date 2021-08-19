import { Request, Response } from "express";
import { bd } from "../database/connection";
import validations from "../validations/config/messages";
import JobValidation from "../validations/job";

export default class Jobs {
  static async check(req: Request, res: Response) {
    let job: Job = req.body;
    let rt = req.params.rt;
    rt = (rt === "create" || rt === "update") ? rt : "create";

    let valuesInUse = await JobValidation.valuesInUse(job, job.id);
    JobValidation.check(valuesInUse.cnpjInUse, rt as "create" | "update")
      .validateAsync(job, {
        abortEarly: false,
        messages: validations.config.messages,
      }).then((res) => {
        return res.status(200).send([]);
      }).catch((err) => {
        return res.status(200).send(err.details);
      });
  };

  static async create(req: Request, res: Response) {
    const job = req.body as Job;

    let valuesInUse = await JobValidation.valuesInUse(job, job.id);
    let validation = await JobValidation.check(valuesInUse.cnpjInUse, "create")
      .validateAsync(job, {
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

    let valuesInUse = await JobValidation.valuesInUse(job, job.id);
    let validation = await JobValidation.check(valuesInUse.cnpjInUse, "update")
      .validateAsync(job, {
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
    } else if (!isNaN(id) && isNaN(user)) {
      return await bd('jobs').select("*")
        .where("id", id)
        .then((r) => {
          console.log("Trabalhos listado!!!");
          return res.status(200).json(r);
        }).catch((err) => {
          console.log(err);
          return res.status(400).json(err);
        });
    } else if (isNaN(id) && !isNaN(user)) {
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