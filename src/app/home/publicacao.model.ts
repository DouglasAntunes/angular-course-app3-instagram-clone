export class Publicacao {
    constructor(
        public key: string,
        public nomeUsuario: string,
        public email: string,
        public titulo: string,
        public imagem: any,
        public urlImagem: string
    ) { }
}
