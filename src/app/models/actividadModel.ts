export class ActividadModel{
    constructor(
        public consecutivo :string,
        public nombre : string,
        public equipo : string,
        public ubicacion_fisica : string,
        public solicitante : string,
        public tercero : string,
        public usuario_creador :string,
        public cargos : string,
        public horas_hombre :string,
        public valor :number,
        public fecha_creacion : string,
        public fecha_requerida : string,
        public fecha_ejecucion : string,
        public fecha_final : string,
        public _id: string,
    ){}
}