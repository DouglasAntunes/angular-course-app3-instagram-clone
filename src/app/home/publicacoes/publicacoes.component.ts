import { Component, OnInit } from '@angular/core';

import { BdService } from 'src/app/bd.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Publicacao } from '../publicacao.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string;

  public publicacoes: Publicacao[];

  constructor(
    private bdService: BdService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;

      this.atualizarTimeLine();
    });
  }

  public atualizarTimeLine(): void {
    this.bdService.consultaPublicacoes(this.email)
      .then((publicacoes: Publicacao[]) => {
        // console.log(publicacoes);
        this.publicacoes = publicacoes;
    });
  }

}
