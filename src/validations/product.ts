
import Joi from 'joi';
import { enumToStringArray, ProductType } from '../enums';

export default class ProductValidation {
 static check(reqType?: "create" | "update") {
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
   job: Joi.number().required().min(-1).integer(),
   name: Joi.string().required().min(4).max(20),
   description: Joi.string().allow("").allow(null).max(500),
   delivery: Joi.boolean(),
   unit: Joi.number().min(0).integer(),
   price: Joi.number().min(0),
   type: Joi.custom((value, helper) => {
    let arr = enumToStringArray(ProductType);

    if (!arr.includes(value)) {
     return helper.error("any.enum");
    } else {
     return value;
    };
   })
  });
 };
};

