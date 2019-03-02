import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../usuario.model';
import { AutenticacaoService } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();

  public mensagemErro: string;

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [ Validators.required ]),
    nomeCompleto: new FormControl(null, [ Validators.required ]),
    nomeUsuario: new FormControl(null, [ Validators.required ]),
    senha: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
  });

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    // console.log(this.formulario);

    const usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nomeCompleto,
      this.formulario.value.nomeUsuario,
      this.formulario.value.senha
    );
    // console.log(usuario);
    this.autenticacaoService.cadastrarUsuario(usuario)
      .then(() => this.exibirPainelLogin())
      .catch((erro: string) => {
        // console.log(erro);
        switch(erro) {
          case 'auth/email-already-in-use': {
            this.mensagemErro = 'Email já está em uso. Utilize outro email e Tente Novamente.';
            break;
          }
          case 'auth/invalid-email': {
            this.mensagemErro = 'Email Inválido. Utilize outro email e Tente Novamente.';
            break;
          }
          case 'auth/weak-password': {
            this.mensagemErro = 'Senha fraca. Utilize senhas fortes com números, letras e caracteres especiais.';
            break;
          }
          default: {
            this.mensagemErro = 'Erro desconhecido. Codigo: ' + erro;
            break;
          }
        }
      });
  }

}
