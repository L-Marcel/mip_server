import { Request, Response } from "express";
import { bd } from "../database/connection";

export default class Products {
  static async create(req: Request, res: Response) {
    const product = req.body as Product;

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

    if (product.id === undefined) {
      return res.status(400).json({ err: "Falta o ID" });
    }

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
      return await bd('products').select("*").then((r) => {
        console.log("Produtos listados!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    } else if(isNaN(id) && !isNaN(job)) {
      return await bd('products').select("*").where("job", job)
      .first().then((r) => {
        console.log("Produtos listados!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    } else if(!isNaN(id) && !isNaN(job)) {
      return await bd('products').select("*")
      .where("job", job).andWhere("id", id)
      .first().then((r) => {
        console.log("Produtos listados!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
    };

    return await bd('products').select("*").where("id", id)
      .first().then((r) => {
        console.log("Produto listado!!!");
        return res.status(200).json(r);
      }).catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  };
}