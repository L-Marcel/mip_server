
import Joi from 'joi';

export default class UserValidation {
    static check(reqType?: "create" | "update") {
        let rt = reqType !== undefined ? reqType : "create";
        
        return Joi.object().keys({
            id: Joi.number().min(1).integer().custom((value, helper) => {
                if (rt === "update" && value === undefined) {
                    return helper.error("any.required");
                } else if (rt === "create" && value !== undefined) {
                    return helper.error("any.unknown");
                } else {
                    return value;
                };
            }),
            name: Joi.string().required().min(4).max(30),
            email: Joi.string().required().min(10).max(50),
            password: Joi.string().required().min(8),
            phone: Joi.string().required().min(10).max(14),
        });
    };
};

