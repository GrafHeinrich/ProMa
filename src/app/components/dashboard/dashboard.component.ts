import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from'@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects: any;
  user:any;

  constructor(
    private firebaseService:FirebaseService,

    ) { }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    console.log(this.user.displayName);
     this.firebaseService.getProjects().subscribe(projects => {
      //console.log(projects);
      this.projects = projects;
      

    });
  }

}
