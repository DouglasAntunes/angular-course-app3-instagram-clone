import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BdService } from 'src/app/bd.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string;

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null)
  });

  constructor(
    private bd: BdService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user: any) => {
      // console.log(user);
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo
    });
  }

}
