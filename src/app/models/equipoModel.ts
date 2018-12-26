export class EquipoModel{
    constructor(
        public tag? :string,
        public nombre_equipo? : string,
        public fecha_creacion? : string,
        public usuario_creador? : string,
        public tercero? : string,
        public estado? : string,
        public user_modificador? :string,
        public _id?: string,
    ){}
}