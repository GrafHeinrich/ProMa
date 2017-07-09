import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  title: any;
  description: any;
<<<<<<< HEAD
  type: any;
  project:any;
  
  projects:any ;
 // pro_key: any;
=======
  pro_key: any;
>>>>>>> e4666b86ac74b3195abf4793f4c373954d3f7feb

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
<<<<<<< HEAD
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
      //pro_key: key,
=======

  }

  onAddSubmit(key) {
    let task = {
      title: this.title,
      description: this.description,
      pro_key: key
>>>>>>> e4666b86ac74b3195abf4793f4c373954d3f7feb
    }
    console.log("test");
    this.firebaseService.addTask(task);

    this.router.navigate(['tasks']);
  }
}
