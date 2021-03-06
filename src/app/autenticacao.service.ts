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
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(
                usuario.email, usuario.senha
            ).then((resposta: any) => {
                // console.log(resposta);

                // remover a senha do obj usuário
                delete usuario.senha;

                // registrando dados complementares no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set({
                        usuario
                }).then(() => resolve())
                .catch((erro: any) => {
                    // console.log('Erro no cadastro de detalhes do usuário: ', erro);
                    reject(erro.code);
                });
            }).catch((erro: any) => {
                // console.log('Erro na criação de usuário: ', erro);
                reject(erro.code);
            });
        });
    }

    public autenticar(email: string, senha: string): Promise<any> {
        // console.log('Email: ', email, ' Senha: ', senha);
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, senha)
                .then((resposta: any) => {
                    // console.log(resposta);
                    firebase.auth().currentUser.getIdToken()
                        .then((idToken: string) => {
                            this.tokenId = idToken;
                            // console.log(this.tokenId);
                            localStorage.setItem('idToken', idToken);
                            resolve();
                            this.router.navigate(['/home']);
                    });
                })
                .catch((erro: any) => {
                    // console.log('Erro ao logar o usuário: ', erro);
                    reject(erro.code);
            });
        });
    }

    public autenticado(): boolean {
        if(this.tokenId === undefined && localStorage.getItem('idToken') !== null) {
            this.tokenId = localStorage.getItem('idToken');
        }
        if(this.tokenId === undefined) {
            this.router.navigate(['/']);
        }
        return (this.tokenId !== undefined);
    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken');
                this.tokenId = undefined;
                this.router.navigate(['/']);
        });
    }
}
