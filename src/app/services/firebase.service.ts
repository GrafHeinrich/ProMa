import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
// import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
   projects: FirebaseListObservable<any[]>;
   project: FirebaseObjectObservable<any>;
   tasks: FirebaseListObservable<any[]>;
   task: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) {
     this.projects = this.af.database.list('/projects') as FirebaseListObservable<Project[]>
     this.tasks = this.af.database.list('/tasks') as FirebaseListObservable<Task[]>
   }
  
  getTasks(){
    return this.tasks;
  }

  getTaskDetails(id){
    this.task = this.af.database.object('/tasks/'+id) as FirebaseObjectObservable<Project>
    return this.task;
  }

  addTask(task) {
    return this.tasks.push(task);
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
  type?: string;
  description?: string;
  workers?: string;
}

interface Project {
  $key?: string;
  title?: string;
  description?: string;
  tasks?: {
    task?: {
      title?: string;
      id?: string;
      description?: string;
      type?: string;
      workers?: string;
    }
  }

}
