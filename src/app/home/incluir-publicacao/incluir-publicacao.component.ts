import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BdService } from 'src/app/bd.service';
import { ProgressoService } from 'src/app/progresso.service';

import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string;

  private imagem: any;

  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number = 0;

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter();

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null)
  });

  constructor(
    private bdService: BdService,
    private progressoService: ProgressoService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user: any) => {
      // console.log(user);
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bdService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    const continua = new Subject();
    continua.next(true);
    const acompanhamentoUpload = interval(1500).pipe(
      takeUntil(continua)
    );

    acompanhamentoUpload.subscribe(() => {
      // console.log(this.progressoService.status);
      // console.log('2 ',this.progressoService.estado);
      this.progressoPublicacao = 'andamento';
      this.porcentagemUpload = Math.round((this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100);

      if(this.progressoService.status === 'concluido') {
        this.progressoPublicacao = 'concluido';

        // emitir um evento do componente parent (home)
        this.atualizarTimeLine.emit();

        // desabilita o timer
        continua.next(false);
      }
    });

  }

  public preparaImagemUpload(event: Event): void {
    // console.log((event.target as HTMLInputElement).files);
    this.imagem = (event.target as HTMLInputElement).files;
  }
}
