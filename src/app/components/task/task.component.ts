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
<<<<<<< HEAD
  projects:any;
  pId:any;
=======
  users: any;
  userlist: any;
  projects: any;
  project: any;
  worker: any;
>>>>>>> b6fcd5aedd310f382c59242321b376456fc656ff

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
<<<<<<< HEAD
  ) {
   }
=======
  ) { 
    this.userlist = {
      name: " ",
    }
  }
>>>>>>> b6fcd5aedd310f382c59242321b376456fc656ff

  ngOnInit() {
    //Get ID
    this.id = this.route.snapshot.params['id'];

  this.firebaseService.getTaskDetails(this.id).subscribe(task => {
    this.task = task;
  });

    this.firebaseService.getProjects().subscribe(projects =>{
      this.projects = projects;
    });

  
  this.firebaseService.getProjects().subscribe(projects => {
    this.projects = projects;
  });

  this.firebaseService.getUsers().subscribe(users => {
    this.users = users;
  });

    for(var i = 0; i < this.projects.length; i++) {
        if (this.projects[i].title == this.task.project) {
          this.project = this.projects[i];
        }
    }

    for(var i = 0; i < this.users.length; i++) {
      if(this.project.workers.includes(this.users[i].name)) {
        this.userlist += this.users[i].name;
      }
    }
    console.log(this.project);
    console.log(this.userlist);
  }
  
  onDeleteClick() {
    this.firebaseService.deleteTask(this.id);

    this.router.navigate(['/dashboard']);
  }

  onAddUser() {
    if(this.worker != null && !this.task.workers.includes(this.worker)) {
    let task = {
      title: this.task.title,
      owner: this.task.owner,
      type: this.task.type,
      description: this.task.description,
      priority: this.task.priority,
      workers: this.task.workers + ", " + this.worker,
    }

    this.firebaseService.updateTask(this.id, task);
    }
  }

  deleteUser() {
    if(this.worker != null && this.task.workers.includes(this.worker)) {
      this.project.workers = this.task.workers.replace(', ' + this.worker,'');

      let task = {
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        workers: this.task.workers,
      }

    this.firebaseService.updateProject(this.id, task);
    }
  }


}
