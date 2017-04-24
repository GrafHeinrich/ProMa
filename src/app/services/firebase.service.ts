import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
// import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
   projects: FirebaseListObservable<any[]>;
   project: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) {
     this.projects = this.af.database.list('/projects') as FirebaseListObservable<Project[]>
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
    }
  }

  users?: {
    user?: {
      name?: string;
      mail?: string;
      profession?: string;
    }
  }
}
