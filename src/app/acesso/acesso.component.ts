import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({ opacity: 1 })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0)' }),
        animate('500ms 0s ease-in-out') // duração, delay e aceleração
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({ opacity: 1 })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0)' }),
        animate('1.5s 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }), // varia de 0 à 1
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)' }),
          // style({ offset: 1, opacity: 1, transform: 'translateY(0)' }) // Não é necessário
        ]))
      ])
    ]),
    trigger('animacao-erro', [
      state('erro', style({ transform: 'translateX(0)' })),
      state('reset', style({ transform: 'translateX(0)' })),
      transition('* => erro', [
        animate('300ms 0s ease-in-out', keyframes([
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(10px)' }),
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(10px)' }),
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(10px)' }),
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(10px)' }),
        ]))
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';
  public estadoErro: string = 'reset';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string): void {
    // console.log(event);
    this.cadastro = (event === 'cadastro');
  }

  public inicioDaAnimacao(): void {
    // console.log('inicio da animação');
  }

  public fimDaAnimacao(): void {
    // console.log('fim da animação');
  }

  public exibirErro(): void {
    this.estadoErro = 'erro';
  }

  public resetErro(): void {
    this.estadoErro = 'reset';
  }

}
