export function enumToStringArray(e: any): string[] {
 let arr = [];

 for(let i in e){
  if (typeof e[i] !== "number") {
   arr.push(e[i]);
  }
 }

 return arr;
};

export function numberToEnumValue(n: number, e: any){
 for(let i in e){
  if(e[i] === n){
   return i;
  }
 }

 return undefined;
};

export enum ProductType { 
 "Item",
 "Serviço"
};

export enum MarkerIcon {
 "white:utensils:Comida",
 "red:book-reader:Aula",
 "darkred:user-md:Saúde",
 "lightred:dumbbell:Academia",
 "orange:store:Loja",
 "beige:palette:Design",
 "green:seedling:Plantas",
 "darkgreen:bread-slice:Padaria",
 "lightgreen:dog:Animais",
 "blue:glass-cheers:Eventos",
 "darkblue:concierge-bell:Hospedagem",
 "lightblue:birthday-cake:Doces",
 "purple:air-freshener:Beleza",
 "darkpurple:user-tie:Justiça",
 "pink:screwdriver:Reparo",
 "cadetblue:address-card:Outros",
 "gray:hard-hat:Construção",
 "lightgray:car-side:Transporte",
 "black:terminal:Tecnologia",
};