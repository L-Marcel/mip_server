declare type User = {
 id?: number,
 name: string,
 email: string,
 password?: string,
 phone: string,
}

declare type Product = Item | Service;

declare type Item = {
 job: number,
 type: "Item",
 id?: number,
 name: string,
 description?: string,
 price: number,
 delivery: boolean,
 unit: number,
}

declare type Service = {
  job: number,
  type: "Serviço",
  id?: number,
  name: string,
  description?: string,
  price: number,
}