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
      //console.log(projects);
      this.tasks = tasks;
    });
  }
  
  onDeleteClick() {
    this.firebaseService.deleteProject(this.id);

    this.router.navigate(['/dashboard']);
  }

}
