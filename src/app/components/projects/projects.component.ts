import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  projects: any;
  counter:any;
  user:any;
  isMember:any;

  constructor(private firebaseService:FirebaseService) {
    this.counter = 0;
    this.user = {
      displayName: "",
    }
   }

  ngOnInit() {

     if (firebase.auth().currentUser !== null) {
      this.user = firebase.auth().currentUser;
    }
    this.counter = 0;
    this.isMember = false;

    this.firebaseService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

   isProjectMember() {

    if (this.user !== null) {
      if (this.counter < this.projects.length) {
        if (this.projects[this.counter].workers.includes(this.user.displayName))
        { this.isMember = true; }
        else { this.isMember = false; }


        this.counter = this.counter + 1;

      }
    }

    if (this.counter >= this.projects.length) { this.counter = 0; }
    return this.isMember;
  }

}
