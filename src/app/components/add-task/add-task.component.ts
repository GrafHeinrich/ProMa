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
  pro_key: any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {

  }

  onAddSubmit(key) {
    let task = {
      title: this.title,
      description: this.description,
      pro_key: key
    }

    this.firebaseService.addTask(task);

    this.router.navigate(['tasks']);
  }
}
