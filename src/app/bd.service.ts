import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import { ProgressoService } from './progresso.service';

@Injectable()
export class BdService {

    constructor(
        private progressoService: ProgressoService
    ) { }

    public publicar(publicacao: any): void {
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

    public consultaPublicacoes(emailUsuario: string): any {
        firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
            .once('value')
            .then((snapshot: any) => {
                console.log(snapshot.val());
            })
            .catch((erro: Error) => console.log(erro));
    }
}
