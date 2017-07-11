import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  counter: any;
  projects: any;
  user: any;
  workers: any;
  isWorker: any;


  constructor(
    private firebaseService: FirebaseService,
  ) {
    this.counter = 0;
    this.user ={
      displayName:"",
    } 
    //console.log("User"+this.user.displayName);
  }

  ngOnInit() {
    if(firebase.auth().currentUser !== null){
    this.user = firebase.auth().currentUser;}
    this.counter = 0;

    this.isWorker = false;

    //console.log(this.user.displayName);
    this.firebaseService.getProjects().subscribe(projects => {
      //console.log(projects);
      this.projects = projects;

      //console.log("Projects length: "+this.projects.length);   
    });
    //console.log(this.workers);
  }

  isMember() {
    //console.log("Counter S: "+this.counter);

   if(this.user !== null){
    if (this.counter < this.projects.length) {
      //console.log("Counter: "+this.counter);
      if (this.projects[this.counter].workers.includes(this.user.displayName)) { this.isWorker = true; }
      else { this.isWorker = false; }

      //console.log("Counter IF: "+this.counter);
      this.counter = this.counter + 1;
      //console.log("Counter Inc: "+this.counter);
    }}

    if (this.counter >= this.projects.length) { this.counter = 0; }
    return this.isWorker;
  }

}
