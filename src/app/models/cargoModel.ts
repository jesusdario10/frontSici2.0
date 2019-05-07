export class CargoModel{
    constructor(
        public nombre? :string,
        public vhora_hombre? : number,
        public usuario_creador? :string,
        public usuario_modificador? :string,
        public estado? : string,
        public tercero? : string,
        public salario_dia?: number,
        public rendimiento?:number,
        public tipo?:string,
        public _id?: string
    ){}
}
export class CargoEdit{
    constructor(
        public nombre?:string,
        public vhora_hombre?:string,
        public estado? : string

    ){}
}