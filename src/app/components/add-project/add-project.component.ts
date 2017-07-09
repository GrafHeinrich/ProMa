import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  title: any;
  description: any;
  priority: any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit() {
    let project = {
      title: this.title,
      description: this.description,
      priority: this.priority
    }

    this.firebaseService.addProject(project);

    this.router.navigate(['projects']);
  }

}
