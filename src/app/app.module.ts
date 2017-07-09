import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectComponent } from './components/project/project.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './components/tasks/tasks.component';


export const firebaseConfig = {
    apiKey: "AIzaSyD2PcodrDEjckQBJZuv8JxA0HGVeJ6MqCI",
    authDomain: "projectmanagement-b6bf1.firebaseapp.com",
    databaseURL: "https://projectmanagement-b6bf1.firebaseio.com",
    projectId: "projectmanagement-b6bf1",
    storageBucket: "projectmanagement-b6bf1.appspot.com",
    messagingSenderId: "967935355976"
  };

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup 
};


const appRoutes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'projects', component:ProjectsComponent},
  {path: 'add-project', component:AddProjectComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'edit-project/:id', component:EditProjectComponent},
  {path: 'add-task', component:AddTaskComponent},
  {path: 'edit-task/:id', component:EditTaskComponent},
  {path: 'project/:id', component:ProjectComponent},
  {path: 'tasks', component:TasksComponent},
  {path: 'task/:id', component:TaskComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    NavbarComponent,
    ProjectComponent,
    AddProjectComponent,
    EditProjectComponent,
    DashboardComponent,
    AddTaskComponent,
    EditTaskComponent,
    TaskComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
