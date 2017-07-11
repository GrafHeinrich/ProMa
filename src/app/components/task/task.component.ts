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
  users: any;
  usernames: any;
  projects: any;
  project: any;
  worker: any;


  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute

  ) { 
    this.usernames = {
    }
  }


  ngOnInit() {
    //Get ID
    this.id = this.route.snapshot.params['id'];

  this.firebaseService.getTaskDetails(this.id).subscribe(task => {
    this.task = task;
  });


    for(var i = 0; i < this.users.length; i++) {
      if(this.project.workers.includes(this.users[i].name)) {
        this.usernames[i] = {name: this.users[i].name};
      }
    }

    console.log(this.project);
    console.log(this.usernames);
  }
  
  onDeleteClick() {
    this.firebaseService.deleteTask(this.id);

    this.router.navigate(['/dashboard']);
  }

  


}
