import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  id: any;
  project: any;
  title: any;
  description: any;
  type: any;
  
  projects:any ;
 // pro_key: any;


  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
  ) { }

  ngOnInit() {

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

    }
    console.log("test");
    this.firebaseService.addTask(task);

    this.router.navigate(['tasks']);
  }
}
