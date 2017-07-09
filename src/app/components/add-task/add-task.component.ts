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
  owner:any;
  projects:any ;
 // pro_key: any;


  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
    console.log(firebase.auth());
    this.owner = firebase.auth().currentUser.displayName;
    this.firebaseService.getProjects().subscribe(projects => {
      //console.log(projects);
      this.projects = projects;
    });
  }

  onAddSubmit() {
    console.log("test1");
    let task = {
      title: this.title,
      description: this.description,
      type: this.type,
      project: this.project,
      owner: this.owner,
      //pro_key: key,

    }
    console.log("test");
    this.firebaseService.addTask(task);

    this.router.navigate(['tasks']);
  }
}
