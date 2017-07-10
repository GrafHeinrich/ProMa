import { Component, OnInit } from '@angular/core';
import {AngularFire} from 'angularfire2';
import {FirebaseService} from '../../services/firebase.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  name: any;
  uid: any;

  constructor(
    public af:AngularFire,
    public flashMessage:FlashMessagesService,
    private router: Router,
    private firebaseService:FirebaseService,
    ) { 
 
    }

  ngOnInit() {

  }

  login() {  
    this.af.auth.login();

    setTimeout( auth => {
    if(firebase.auth().currentUser == null) {
      console.log("Couldn't find any user!");
    }

    if(firebase.auth().currentUser != null) {
        this.user = firebase.auth().currentUser;

        let nUser = {
          name: this.user.displayName,
          uid: this.user.uid,
        }

        this.firebaseService.addUser(nUser);
    }
    }, 10000);

    this.router.navigate(['/']);
  }

  logout() {
    this.af.auth.logout();
    this.flashMessage.show('You are logged out', 
    {cssClass: 'alert-success', timeout: 3000});

    this.router.navigate(['/']);
  }

}
