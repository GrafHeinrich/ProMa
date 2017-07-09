import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
   projects: FirebaseListObservable<any[]>;
   project: FirebaseObjectObservable<any>;
   tasks: FirebaseListObservable<any[]>;
   task: FirebaseObjectObservable<any>;
   users: FirebaseListObservable<any[]>;
   user: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) {
     this.projects = this.af.database.list('/projects') as FirebaseListObservable<Project[]>
     this.tasks = this.af.database.list('/tasks') as FirebaseListObservable<Task[]>
     this.users = this.af.database.list('/users') as FirebaseListObservable<User[]>
   }
  
  getTasks(){
    return this.tasks;
  }

  getTaskDetails(id){
    this.task = this.af.database.object('/tasks/'+id) as FirebaseObjectObservable<Task>
    return this.task;
  }

  addTask(task) {
    return this.tasks.push(task);
  }

  updateTask(id, task) {
    return this.tasks.update(id, task);
  }

  deleteTask(id) {
    return this.tasks.remove(id);
  }
 

  getProjects() {
    return this.projects;
  }

  getProjectDetails(id) {
    this.project = this.af.database.object('/projects/'+id) as FirebaseObjectObservable<Project>
    return this.project;
  }

  addProject(project) {
    return this.projects.push(project);
  }

  updateProject(id, project) {
    return this.projects.update(id, project);
  }

  deleteProject(id) {
    return this.projects.remove(id);
  }

}

interface Task {
  $key?: string;
  title?: string;
<<<<<<< HEAD
  type?: string;
=======
>>>>>>> e4666b86ac74b3195abf4793f4c373954d3f7feb
  description?: string;
  pro_key?: string;
}

interface Project {
  $key?: string;
  title?: string;
  description?: string;
}

interface User {
  name?: string;
  uid?: string;
}
