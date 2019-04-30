export class ActividadModel{
    constructor(
        public consecutivo? :string,
        public equipo? : string,
        public libreria? : string,
        public ubicacion? : string,
        public solicitante? : string,
        public prioridad? : string,
        public tercero? : string,
        public turno? : string,
        public estado? : string,
        public descripcion? : string,
        public restriccion? : string,
        public usuario_creador? :string,
        public fecha_creacion? : string,
        public fecha_requerida? : string,
        public fecha_ejecucion? : string,
        public fecha_final? : string,
        public recurso? : Recurso,
        public horas_hombre? :string,
        public valor? :number,
        public historico?:string,
        public ccosto?:string,
        public _id?: string,
    ){}
}
export class Recurso{
    cargo: string;
    hh : number;
    vhora_hombre:number;
}
