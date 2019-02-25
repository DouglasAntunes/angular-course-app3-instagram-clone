import * as firebase from 'firebase/app';
import 'firebase/database';

export class BdService {
    public publicar(publicacao: any): void {
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({
                titulo: publicacao.titulo
        });
    }
}
