const validations = {
 config: {
  messages: {
   "any.required": "{#label}|Deve ser informado.",
   "any.unknown": "{#label}|É desconhecido.",
   "any.unique": "{#label}|Já se encontra em uso.",
   "any.number": "{#label}|Deve ser um número.",
   "number.max": "{#label}|Deve ser menor ou igual a {#limit}.",
   "number.min": "{#label}|Deve ser maior ou igual a {#limit}.",
   "number.integer": "{#label}|Deve ser um número inteiro.",
   "string.empty": "{#label}|Deve ser informado.",
   "string.min": "{#label}|Deve ter no mínimo {#limit} caractéres.",
   "string.max": "{#label}|Deve ter no máximo {#limit} caractéres.",
   "string.email": "{#label}|Inválido.",
   "string.pattern.base": "{#label}|Inválido.",
   "any.enum": "{#label}|Inválido.",
   "any.invalid": "{#label}|Inválido."
  }
 }
};

export default validations;