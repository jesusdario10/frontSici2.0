export class UserModel{
    constructor(
        public nombre? :string,
        public correo? : string,
        public role? : string,
        public password? : string,
        public celular? : string,
        public tercero? : string,
        public image? : string,
        public usuario_creador? :string,
        public estado? : string,
        public gettoken? : string,
        public _id?: string,
    ){}
}