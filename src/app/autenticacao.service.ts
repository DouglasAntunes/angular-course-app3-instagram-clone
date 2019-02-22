import { Usuario } from './acesso/usuario.model';

export class AutenticacaoService {


    public cadastrarUsuario(usuario: Usuario): void {
        console.log('chegamos até o serviço: ', usuario);
    }


}
