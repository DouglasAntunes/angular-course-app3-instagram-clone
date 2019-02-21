import { Component, OnInit } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      }))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'visivel';

  public imagens: Imagem[] = [
    {estado: 'escondido', url: './assets/banner-acesso/img_1.png'},
    {estado: 'escondido', url: './assets/banner-acesso/img_2.png'},
    {estado: 'escondido', url: './assets/banner-acesso/img_3.png'},
    {estado: 'escondido', url: './assets/banner-acesso/img_4.png'},
    {estado: 'escondido', url: './assets/banner-acesso/img_5.png'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
