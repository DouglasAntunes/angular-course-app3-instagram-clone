import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AutenticacaoService } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();
  @Output() public erro: EventEmitter<any> = new EventEmitter();

  public mensagemErro: string;

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [ Validators.required ]),
    senha: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
  });

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.autenticacaoService.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    ).catch((erro: string) => {
      this.erro.emit();
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithEmailAndPassword
      switch(erro) {
        case 'auth/invalid-email': {
          this.mensagemErro = 'Email inválido. Verifique o email digitado e tente novamente.';
          break;
        }
        case 'auth/user-disabled': {
          this.mensagemErro = 'Este usuário está desabilitado. Entre em contato com o administrador';
          break;
        }
        case 'auth/user-not-found': {
          this.mensagemErro = 'O nome de usuário inserido não pertence a uma conta. Verifique seu nome de usuário e tente novamente.';
          break;
        }
        case 'auth/wrong-password': {
          this.mensagemErro = 'Senha incorreta. Tente novamente';
          break;
        }
        default: {
          this.mensagemErro = 'Erro desconhecido. Código: ' + erro;
          break;
        }
      }
    });
  }

}
