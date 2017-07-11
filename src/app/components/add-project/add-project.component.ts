import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  title: any;
  description: any;
  priority: any;
  user:any;
  users:any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
  ) { 

    this.user = {
      displayName: "",
    }
  }

  ngOnInit() {

       this.firebaseService.getUsers().subscribe(users => {
      this.users = users;
    });

     if (firebase.auth().currentUser !== null) {
      this.user = firebase.auth().currentUser.displayName;
    }
    //console.log("Hallo "+ this.user)
  }

  onAddSubmit() {
    let project = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      workers: this.user,
    }

    this.firebaseService.addProject(project);

    this.router.navigate(['projects']);
  }
  

}
