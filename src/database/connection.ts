import Knex from "knex";

let knexfile = require("../../knexfile.ts");

let config = knexfile.production;
if(process.env.NODE_ENV !== "production"){
 config = knexfile.development;
}

export const bd = Knex(config);