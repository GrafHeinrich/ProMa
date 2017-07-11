import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  title: any;
  description: any;
  type: any;
  project:any;
  projects:any ;
  priority:any;
  workers: any;
  isDone:boolean;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { 
    this.workers = {
      displayName: " ",
    }
  }

  ngOnInit() {
    //this.owner = firebase.auth().currentUser.displayName;
    this.firebaseService.getProjects().subscribe(projects => {
      this.projects = projects;
    });

    if (firebase.auth().currentUser !== null) {
      this.workers = firebase.auth().currentUser.displayName;
    }
  }

  onAddSubmit() {
    let task = {
      title: this.title,
      description: this.description,
      type: this.type,
      workers: this.workers,
      project: this.project,
      priority: this.priority,
      isDone:false,
    }
    this.firebaseService.addTask(task);

    this.router.navigate(['tasks']);
  }
}
