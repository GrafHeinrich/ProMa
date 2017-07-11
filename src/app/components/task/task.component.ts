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
  worker: any;


  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute) { 

  }


  ngOnInit() {
    //Get ID
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getTaskDetails(this.id).subscribe(task => {
      this.task = task;
    });

    this.firebaseService.getUsers().subscribe(users => {
      this.users = users;
    });

  }
  
  onDeleteClick() {
    this.firebaseService.deleteTask(this.id);

    this.router.navigate(['/dashboard']);
  }

  onAddUser() {
    if(this.worker != null && !this.task.workers.includes(this.worker)) {
    let task = {
      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority,
      workers: this.task.workers + ", " + this.worker,
    }

    this.firebaseService.updateTask(this.id, task);
    }
  }

  deleteUser() {
    if(this.worker != null && this.task.workers.includes(this.worker)) {
      this.task.workers = this.task.workers.replace(', ' + this.worker,'');

      let task = {
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        workers: this.task.workers,
      }

    this.firebaseService.updateTask(this.id, task);
    }
  }

}
