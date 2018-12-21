export class EquipoModel{
    constructor(
        public tag :string,
        public descripcion : string,
        public fecha_creacion : string,
        public Usuario_creador : string,
        public tercero : string,
        public estado : string,
        public user_modificador :string,
        public _id: string,
    ){}
}