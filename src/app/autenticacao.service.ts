import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { Usuario } from './acesso/usuario.model';

@Injectable()
export class AutenticacaoService {

    public tokenId: string;

    constructor(
        private router: Router
    ) { }

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
                // console.log(resposta);
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.tokenId = idToken;
                        // console.log(this.tokenId);
                        this.router.navigate(['/home']);
                });
            })
            .catch((erro: Error) => {
                console.log('Erro ao logar o usuário: ', erro);
            });
    }

    public autenticado(): boolean {
        return (this.tokenId !== undefined);
    }
}
