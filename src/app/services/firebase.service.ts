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
   folder:any;

  constructor(private af: AngularFire) {
     this.projects = this.af.database.list('/projects') as FirebaseListObservable<Project[]>
     this.tasks = this.af.database.list('/tasks') as FirebaseListObservable<Task[]>
     this.users = this.af.database.list('/users') as FirebaseListObservable<User[]>
     this.folder = "project_data";
   }

  addUser(user){

    for (var uid in this.users) {
      if (this.users.hasOwnProperty(uid)) {
          if(user.uid == uid) {
            console.log("Found user and added to database!");
            return this.users.push(user);
          }
          else {
            console.log("User already in database!");
          }
      }
    }

  }

  getUsers() {
    return this.users;
  }

  getUserDetail(id) {
    this.user = this.af.database.object('/users') as FirebaseObjectObservable<User>
  }

  updateUser(id, user) {
    return this.users.update(id, user);
  }

  deleteUser(id) {
    return this.users.remove(id);
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

  addData(project){
      let storageRef = firebase.storage().ref();
  }

}

interface Task {
  $key?: string;
  title?: string;
  type?: string;
  description?: string;
}

interface Project {
  $key?: string;
  title?: string;
  description?: string;
}

interface User {
  $key?: string;
  name?: string;
  uid?: string;
}
