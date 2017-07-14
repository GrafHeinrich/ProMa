import { Injectable } from '@angular/core';

import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import 'firebase/storage'

import {Observable} from 'rxjs';

@Injectable()
export class FirebaseService {
   projects: FirebaseListObservable<any[]>;
   project: FirebaseObjectObservable<any>;
   tasks: FirebaseListObservable<any[]>;
   task: FirebaseObjectObservable<any>;
   users: FirebaseListObservable<any[]>;
   user: FirebaseObjectObservable<any>;

   fileList: FirebaseListObservable<any[]>;
   files: Observable<any[]>;
   folder:any;

  constructor(private af: AngularFire, fb:AngularFireDatabase ) {
     this.projects = this.af.database.list('/projects') as FirebaseListObservable<Project[]>
     this.tasks = this.af.database.list('/tasks') as FirebaseListObservable<Task[]>
     this.users = this.af.database.list('/users') as FirebaseListObservable<User[]>
     this.folder = "project_storObj";
     this.fileList = this.af.database.list(`/${this.folder}`)
   }

   addStoreObj(project){
    let storageRef = firebase.storage().ref();
    for(let selectedFile of[(<HTMLInputElement>document.getElementById('uploadData')).files[0]]){
      let path = '/${this.foler}/${selectedFile.name}';
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) =>{
        project.storeOb = selectedFile.name;
        project.path = path; 
        return this.projects.push(project);
      });
    }
   }


   getFiles(){
     return this.fileList;
   }

  addUser(user){
  return this.users.push(user);
  }

  getUsers() {
    return this.users;
  }

  getUserDetails(id) {
    this.user = this.af.database.object('/users/' + id) as FirebaseObjectObservable<User>
    return this.user;
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
    let result = null;
    let storageRef = firebase.storage().ref();
    for(let selectedFile of[(<HTMLInputElement>document.getElementById('uploadData')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) =>{
        project.storeOb = selectedFile.name;
        let that = this;
        iRef.getDownloadURL().then(url =>{
          project.path = url;
          return result = that.projects.push(project);
        })
        //return this.projects.push(project);
      });
    }

    return result;
  }

  updateProject(id, project) {
    let result = null;
    let storageRef = firebase.storage().ref();
    for(let selectedFile of[(<HTMLInputElement>document.getElementById('uploadData')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) =>{
        project.storeOb = selectedFile.name;
        let that = this;
        iRef.getDownloadURL().then(url =>{
          project.path = url;
          return result = that.projects.update(id,project);
        })
        //return this.projects.push(project);
      });
    }

    return result;
    //return this.projects.update(id, project);
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
