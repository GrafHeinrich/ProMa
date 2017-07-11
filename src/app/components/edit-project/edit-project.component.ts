import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  id;
  title;
  description;
  priority;
  workers;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getProjectDetails(this.id).subscribe(project => {
      this.title = project.title;
      this.description = project.description;
      this.priority = project.priority;
      this.workers = project.workers;
    });
  }

  onEditSubmit() {
    let project = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      workers: this.workers,
    }

    this.firebaseService.updateProject(this.id, project);

    this.router.navigate(['/projects']);
  }

}
