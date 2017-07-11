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
  tasks: any;
  users: any;
  worker: any;

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
  });
  
  this.firebaseService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });

    this.firebaseService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  
  onDeleteClick() {
    this.firebaseService.deleteProject(this.id);

    this.router.navigate(['/dashboard']);
  }

  onAddUser() {
    let project = {
      title: this.project.title,
      description: this.project.description,
      priority: this.project.priority,
      workers: this.project.workers + ", " + this.worker,
    }

    this.firebaseService.updateProject(this.id, project);
  }

}
