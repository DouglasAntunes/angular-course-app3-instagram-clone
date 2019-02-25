import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BdService } from 'src/app/bd.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null)
  });

  constructor(
    private bd: BdService
  ) { }

  ngOnInit() {
  }

  public publicar(): void {
    this.bd.publicar();
  }

}
