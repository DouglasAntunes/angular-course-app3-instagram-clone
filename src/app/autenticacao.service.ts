import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { Usuario } from './acesso/usuario.model';

export class AutenticacaoService {


    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        // console.log('chegamos até o serviço: ', usuario);
        return firebase.auth().createUserWithEmailAndPassword(
            usuario.email, usuario.senha
        ).then((resposta: any) => {
            // console.log(resposta);

            // remover a senha do obj usuário
            delete usuario.senha;

            // registrando dados complementares no path email na base64
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                .set({
                    usuario
            });
        }).catch((erro: Error) => {
            console.log('Erro na criação de usuário: ', erro);
        });
    }

    public autenticar(email: string, senha: string): void {
        console.log('Email: ', email, ' Senha: ', senha);
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                console.log(resposta);
            })
            .catch((erro: Error) => {
                console.log(erro);
            });
    }
}
