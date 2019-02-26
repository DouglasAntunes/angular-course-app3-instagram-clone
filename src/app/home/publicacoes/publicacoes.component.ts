import { Component, OnInit } from '@angular/core';

import { BdService } from 'src/app/bd.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string;

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
    this.bdService.consultaPublicacoes(this.email);
  }

}
