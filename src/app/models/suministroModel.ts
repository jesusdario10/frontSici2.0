'use strict';

export class SuministroModel{
    constructor(
        public tipo? :string,
        public nombre? : string,
        public v_dia? : string,
        public iva? : string,
        public usuario_creador? : string,
        public usuario_modificador? : string,
        public estado?:string,
        public tercero? : string,
        public fecha_creacion?:string,
        public _id?: string,
    ){}
}