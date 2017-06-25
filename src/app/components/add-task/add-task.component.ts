import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  title: any;
  description: any;
  type: any;
  pro_key: any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit() {
    let task = {
      title: this.title,
      description: this.description,
      type: this.type,
      //pro_key: key,
    }

    this.firebaseService.addTask(task);

    this.router.navigate(['projects']);
  }
}
