import { Request, Response } from "express";
import { bd } from "../database/connection";

export default class Products {
 /**
  * Recebe um produto no corpo da requisição e salva
  * ele no banco de dados
  * @param req - request (requisição)
  * @param res - response (resposta)
  * @returns - o id do item criado
  */
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

 /**
  * Recebe um produto no corpo da requisição que contem um ID
  * e atualiza o produto com o mesmo ID dentro do banco de dados
  * @param req - request (requisição)
  * @param res - response (resposta)
  * @returns - o id do item criado
  */
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

 /**
  * Recebe um ID no corpo da requisição e deleta o 
  * produto com o mesmo ID no banco de dados
  * @param req 
  * @param res 
  * @returns 
  */
 static async delete(req: Request, res: Response) {
  const product = req.body as Product;

  if (product.id === undefined) {
   return res.status(400).json({ err: "Falta o ID" });
  }

  return await bd('products').delete().where("id", product.id).then((r) => {
   console.log("Produto deletado!!!");
   return res.status(200).json(r);
  }).catch((err) => {
   console.log(err);
   return res.status(400).json(err);
  });
 };

 /**
  * Lista todos os produtos, pode receber um ID, nesse caso
  * ele irá retornar apenas um produto.
  * @param req - request (requisição)
  * @param res - response (resposta)
  * @returns - o id do item criado
  */
 static async list(req: Request, res: Response) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
   return await bd('products').select("*").then((r) => {
    console.log("Produtos listados!!!");
    return res.status(200).json(r);
   }).catch((err) => {
    console.log(err);
    return res.status(400).json(err);
   });
  }

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