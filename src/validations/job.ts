
import Joi from 'joi';
import { bd } from '../database/connection';
import { enumToStringArray, MarkerIcon } from '../enums';

export default class JobValidation {
 static async valuesInUse(job: Job, id?: number) {
  let jobs: Job[] = await bd('jobs').select('CNPJ').whereNot('id', id? id:"-1");
  let cnpjInUse = false;

  for(let i in jobs){
   cnpjInUse = cnpjInUse? cnpjInUse:(job.CNPJ !== "" && job.CNPJ !== undefined && jobs[i].CNPJ === job.CNPJ);
  };

  return {
   cnpjInUse,
  }
 };

 static check(cnpjInUse: boolean, reqType?: "create" | "update") {
  let rt = reqType !== undefined? reqType:"create";

  return Joi.object().keys({
   id: Joi.number().min(1).integer().custom((value, helper) => {
    if (rt === "update" && value === undefined) {
     return helper.error("any.required");
    } else if(rt === "create" && value !== undefined) {
     return helper.error("any.unknown");
    } else {
     return value;
    };
   }),
   user: Joi.number().required().min(1).integer(),
   name: Joi.string().required().min(4).max(20),
   lat: Joi.number().required(),
   lng: Joi.number().required(),
   description: Joi.string().allow("").allow(null).max(500),
   CNPJ: Joi.string().allow("").custom((value, helper) => {
    if (cnpjInUse) {
     return helper.error("any.unique");
    } else {
     return value;
    };
   }),
   icon: Joi.custom((value, helper) => {
    let arr = enumToStringArray(MarkerIcon);

    if (!arr.includes(value)) {
     return helper.error("any.enum");
    } else {
     return value;
    };
   })
  });
 };
};

