import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Usuario } from '../usuario.model';
import { AutenticacaoService } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null),
    nomeCompleto: new FormControl(null),
    nomeUsuario: new FormControl(null),
    senha: new FormControl(null)
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

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nomeCompleto,
      this.formulario.value.nomeUsuario,
      this.formulario.value.senha
    );
    // console.log(usuario);
    this.autenticacaoService.cadastrarUsuario(usuario);
  }

}
