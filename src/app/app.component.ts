import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app3';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyCIZGF5afXGsl44qbVUenQqYOYjh8psgu8',
      authDomain: 'jta-instagram-clone-2f9e3.firebaseapp.com',
      databaseURL: 'https://jta-instagram-clone-2f9e3.firebaseio.com',
      projectId: 'jta-instagram-clone-2f9e3',
      storageBucket: 'jta-instagram-clone-2f9e3.appspot.com',
      messagingSenderId: '413258453663'
    });
  }
}
