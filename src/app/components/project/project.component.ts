import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  id: any;
  project: any;
  tasks:any;
  task:any;
  key1:any;
  keys:any;
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //Get ID
    this.id = this.route.snapshot.params['id'];
    
    this.firebaseService.getProjectDetails(this.id).subscribe(project => {
    this.project = project;
    this.tasks = this.project.tasks;
      //console.log(project);
    });

     this.keys = Object.keys(this.tasks);
     this.key1 = <any>this.keys[0].toString();


    //this.tasks = this.project.tasks;
    console.log();

    /*this.tasks = this.firebaseService.getTasks();
   
    this.firebaseService.getTaskDetails(this.id).subscribe(task => {
    this.task = task;
    
     // console.log(task);
    });
    for(var i=0; i<this.tasks.length;i++){
      console.log(this.task);
      if(this.task.pro_key==this.id){
        this.task = this.tasks[i];
      }

    }
    console.log(this.task);*/
  }
  
  onDeleteClick() {
    this.firebaseService.deleteProject(this.id);

    this.router.navigate(['/dashboard']);
  }

}
