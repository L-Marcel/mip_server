import Knex from "knex";

let knexfile = require("../../knexfile.ts");

let config = knexfile.production;
if(process.env.NODE_ENV !== "production"){
 config = knexfile.development;
}


//Faz a conexão como banco de dados
export const bd = Knex(config);