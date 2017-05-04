import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects: any;

  constructor(
    private firebaseService:FirebaseService,

    ) { }

  ngOnInit() {
    
     this.firebaseService.getProjects().subscribe(projects => {
      //console.log(projects);
      this.projects = projects;
      

    });
  }

}
