import { Request, Response } from "express";
import { bd } from "../database/connection";
import validations from "../validations/config/messages";
import ProductValidation from "../validations/product";

export default class Products {
  static async check(req: Request, res: Response) {
    const job: Job = req.body;
    let rt = req.params.rt;
    rt = (rt === "create" || rt === "update") ? rt : "create";

    ProductValidation.check(rt as "create" | "update")
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
    const product = req.body as Product;

    let validation = await ProductValidation.check("create")
    .validateAsync(product, {
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

    return await bd('products').insert(product).then((r) => {
      console.log("Produto criado!!!");
      return res.status(200).json(r);
    }).catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
  };

  static async update(req: Request, res: Response) {
    const product = req.body as Product;

    let validation = await ProductValidation.check("update")
    .validateAsync(product, {
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

    return await bd('products').update(product).where("id", product.id).then((r) => {
      console.log("Produto atualizado!!!");
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

    return await bd('products').delete().where("id", id).then((r) => {
      console.log("Produto deletado!!!");
      return res.status(200).json(r);
    }).catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
  };

  static async list(req: Request, res: Response) {
    const id = Number(req.query.id);
    const job = Number(req.query.job);

    if (isNaN(id) && isNaN(job)) {
      return await bd('products').join("jobs", "products.job", "jobs.id")
      .select("products.*", "jobs.user").then((r) => {
        console.log("Produtos listados!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    } else if(isNaN(id) && !isNaN(job)) {
      return await bd('products').join("jobs", "products.job", "jobs.id")
      .select("products.*", "jobs.user").where("job", job)
      .then((r) => {
        console.log("Produtos listados!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    } else if(!isNaN(id) && !isNaN(job)) {
      return await bd('products').join("jobs", "products.job", "jobs.id")
      .select("products.*", "jobs.user")
      .where("job", job).andWhere("id", id)
      .first().then((r) => {
        console.log("Produtos listados!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    };

    return await bd('products').join("jobs", "products.job", "jobs.id")
      .select("products.*", "jobs.user")
      .where("id", id)
      .then((r) => {
        console.log("Produto listado!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  };
}