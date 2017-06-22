import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
   id;
   pro_key:any;
  title: any;
  description: any;
   t_title: any;
  t_description: any;
  tasks;
  priority;

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
    });
  }

  onAddSubmit() {
    let task = {
      title: this.t_title,
      description: this.t_description,
    
      
    }

    this.firebaseService.addTask(task);

    this.router.navigate(['projects']);
  }
}
