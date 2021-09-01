import Knex from "knex";

let knexfile = require(process.env.NODE_ENV !== "production"? "../../knexfile.ts":"../../knexfile.js");


let config = knexfile.production;
if(process.env.NODE_ENV !== "production"){
  
 config = knexfile.development;
}

export const bd = Knex(config);