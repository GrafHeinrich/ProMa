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
  userN: any;
  name: any;
  uid: any;
  users: any;
  uids: any;
  isUid: any;

  constructor(
    public af:AngularFire,
    public flashMessage:FlashMessagesService,
    private router: Router,
    private firebaseService:FirebaseService,
    ) { 
      this.user = {
        displayName:"",
        uid:"",
      } 
    }

  ngOnInit() {
    if(firebase.auth().currentUser !== null){
    this.user = firebase.auth().currentUser;
  }
    this.isUid = false;

    this.firebaseService.getUsers().subscribe(users => {
      this.users = users;  
    });
  }

  login() {  
    this.af.auth.login();

    setTimeout( auth => {
    this.user = firebase.auth().currentUser;

    if(!this.sameUid()) {
      //console.log(this.isUid);
        let nUser = {
          name: this.user.displayName,
          uid: this.user.uid,
        }
        this.user.name = nUser.name;
        this.firebaseService.addUser(nUser);
        console.log("Added new User!");
    }
    else {
      //console.log(this.isUid);
      console.log("User already in database!");
    }
    }, 3000);

    this.router.navigate(['/']);
  }

  logout() {
    this.af.auth.logout();
    this.flashMessage.show('You are logged out', 
    {cssClass: 'alert-success', timeout: 3000});

    this.router.navigate(['/']);
  }

  sameUid() {
    if(this.user !== null){
      this.isUid = false;
      for(var i = 0; i < this.users.length; i++) {
        if (this.users[i].uid.includes(this.user.uid)) { this.isUid = true; }
      }

      return this.isUid;
    }
  }

}
