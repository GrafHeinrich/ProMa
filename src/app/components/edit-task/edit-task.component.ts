import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  id;
  title;
  description;
  type;
  priority;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getTaskDetails(this.id).subscribe(task => {
      this.title = task.title;
      this.description = task.description;
      this.type = task.type;
      this.priority = task.priority;
    });
  }

  onEditSubmit() {
    let task = {
      title: this.title,
      description: this.description,
      type: this.type,
      priority: this.priority
    }

    this.firebaseService.updateTask(this.id, task);

    this.router.navigate(['/projects']);
  }

}
