import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  id: any;
  task: any;
  projects:any;
  pId:any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
   }

  ngOnInit() {
    //Get ID
    this.id = this.route.snapshot.params['id'];
    
    this.firebaseService.getTaskDetails(this.id).subscribe(task => {
    this.task = task;
  });

    this.firebaseService.getProjects().subscribe(projects =>{
      this.projects = projects;
    });

  
  }
  
  onDeleteClick() {
    this.firebaseService.deleteTask(this.id);

    this.router.navigate(['/dashboard']);
  }



}
