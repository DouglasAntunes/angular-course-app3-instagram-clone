import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import { Publicacao } from './home/publicacao.model';

import { ProgressoService } from './progresso.service';

@Injectable()
export class BdService {

    constructor(
        private progressoService: ProgressoService
    ) { }

    public publicar(publicacao: Publicacao): void {
        // console.log(publicacao);

        // Inclusão do título e referencia da imagem
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({ titulo: publicacao.titulo })
        .then((resposta: any) => {
            const nomeImagem = resposta.key;
            // Upload da Imagem com o nome da key do documento
            firebase.storage().ref()
                .child(`imagens/${nomeImagem}`)
                .put(publicacao.imagem)
                .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    // acompanhamento do progresso de upload
                    (snapshot: any) => {
                        // console.log(snapshot);
                        this.progressoService.status = 'andamento';
                        this.progressoService.estado = snapshot;
                    },
                    (error: Error) => {
                        // console.log(error);
                        this.progressoService.status = 'erro';
                    },
                    // finalização do processo
                    () => {
                        // console.log('upload completo');
                        this.progressoService.status = 'concluido';
                    }
            );
        });
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {
            // consulta as publicações no database
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
            .orderByKey()
            .once('value')
            .then((snapshot: any) => {
                // console.log(snapshot.val());
                const publicacoes: Publicacao[] = [];

                snapshot.forEach((childSnapshot: any) => {
                    const publicacao: Publicacao = childSnapshot.val();
                    publicacao.key = childSnapshot.key;
                    publicacoes.push(publicacao);
                });
                // console.log(publicacoes);
                return publicacoes.reverse();
            })
            .then((publicacoes: Publicacao[]) => {
                // console.log(publicacoes);
                publicacoes.forEach((publicacao: Publicacao) => {
                    // consultar a url da imagem no storage
                    firebase.storage().ref()
                    .child(`imagens/${publicacao.key}`)
                    .getDownloadURL()
                    .then((url: string) => {
                        // console.log(url);
                        publicacao.urlImagem = url;

                        // Obter o nome de usuário
                        firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                            .once('value')
                            // tslint:disable-next-line:no-shadowed-variable
                            .then((snapshot: any) => {
                                // console.log(snapshot.val().usuario.nomeUsuario);
                                publicacao.nomeUsuario = snapshot.val().usuario.nomeUsuario;
                        });
                    });
                });
                // console.log(publicacoes);
                resolve(publicacoes);
            })
            .catch((erro: Error) => {
                // console.log(erro);
                reject(erro);
            });
        });
    }
}


/*



*/
