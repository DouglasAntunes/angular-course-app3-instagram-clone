import * as firebase from 'firebase';

import { Usuario } from './acesso/usuario.model';

export class AutenticacaoService {


    public cadastrarUsuario(usuario: Usuario): void {
        // console.log('chegamos até o serviço: ', usuario);
        firebase.auth().createUserWithEmailAndPassword(
            usuario.email, usuario.senha
        ).then((resposta: any) => {
            console.log(resposta);
        }).catch((erro: Error) => {
            console.log('Erro na criação de usuário: ', erro);
        })
    }


}
