export class EquipoModel{
    constructor(
        public tag? :string,
        public nombre_equipo? : string,
        public fecha_creacion? : string,
        public usuario_creador? : string,
        public tercero? : string,
        public estado? : string,
        public usuario_modificador? :string,
        public ubicacion? :string,
        public _id?: string,
    ){}
}