import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

export class BdService {
    public publicar(publicacao: any): void {
        console.log(publicacao);

        const nomeImagem = Date.now();

        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                // acompanhamento do progresso de upload
                (snapshot: any) => {
                    // console.log(snapshot);
                },
                (error: Error) => {
                    console.log(error);
                },
                // finalização do processo
                () => {
                    // console.log('upload completo');
                }
            );

        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({
        //         titulo: publicacao.titulo
        // });
    }
}
