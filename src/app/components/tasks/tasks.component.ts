import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any;
  counter: any;
  user: any;
  isMember: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {

    if (firebase.auth().currentUser !== null) {
      this.user = firebase.auth().currentUser;
    }
    this.counter = 0;
    this.isMember = false;

    this.firebaseService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

 isTaskMember() {

    if (this.user !== null) {
      if (this.counter < this.tasks.length) {
        if (this.tasks[this.counter].workers.includes(this.user.displayName))
        { this.isMember = true; }
        else { this.isMember = false; }


        this.counter = this.counter + 1;

      }
    }

    if (this.counter >= this.tasks.length) { this.counter = 0; }
    return this.isMember;
  }

}
