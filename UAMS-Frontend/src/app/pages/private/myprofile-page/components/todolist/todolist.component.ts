import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  isLoading:boolean = false;
  
  createModalIsActive:boolean = false;
  editModalIsActive: boolean = false;

  selectedTask:number = -1;
  
  tasks:Task[] = [];
  newTask:Task = new Task();
  
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.GetAllTask();
  }

  GetAllTask()
  {
    this.tasks = [];
    
    this.isLoading = true;
    this.taskService.GetAll().then((res) =>{
      console.log(res);
      for(let i=0; i<res.length; i++)
      {
        let newTask = Object.create(Task);
        
        newTask.id = res[i].id;
        newTask.title = res[i].title;
        newTask.description = res[i].description;
        newTask.completed = res[i].completed;

        this.tasks.push(newTask);
      }
      this.isLoading = false;
    }).catch((err) =>{
      this.isLoading = false;
      window.alert(err);
    });
  }

  OnEditTitle(event:any)
  {
    this.newTask.title = event.target.value;
  }

  OnEditDescription(event:any)
  {
    this.newTask.description = event.target.value;
  }

  OnClickCompleted(i:any)
  {
    this.isLoading = true;
    let body = {
      completed: !this.tasks[i].completed
    }
    this.taskService.Update(this.tasks[i].id, body).then((res) =>{
      this.isLoading = false;
      this.tasks[i].completed = !this.tasks[i].completed;
    }).catch((err) =>{
      this.isLoading = false;
      window.alert(err.status + " " + err.statusText);
    });
  }

  OnClickNew()
  {
    this.selectedTask = -1;
    this.newTask.title = "";
    this.newTask.description = "";

    this.createModalIsActive = true;
  }

  OnClickClose()
  {
    this.createModalIsActive = false;
    this.editModalIsActive = false;
  }

  OnClickTask(i:any)
  {
    this.selectedTask = i;
    this.newTask = JSON.parse(JSON.stringify(this.tasks[i]));
    this.editModalIsActive = true;
  }

  OnClickAdd()
  {
    this.isLoading = true;
    
    let body = {
      title: this.newTask.title,
      description: this.newTask.description
    }

    this.taskService.Create(body).then((res)=>{
      console.log(res);
      this.isLoading = false;
      this.OnClickClose();
      this.GetAllTask();
    }).catch((err) =>{
      this.isLoading = false;
      window.alert(err);
    });
  }

  OnClickDelete()
  {
    this.isLoading = true;
    this.taskService.Delete(this.tasks[this.selectedTask].id).then((res) =>{
    this.isLoading=false;
    this.OnClickClose();
    this.GetAllTask();      
    }).catch((err) =>{
      this.isLoading = false;
      window.alert(err.status + " " + err.statusText);
    })
  }

  OnClickSaveChanges()
  {
    this.isLoading = true;
    let body = {
      title: this.newTask.title,
      description: this.newTask.description
    }

    this.taskService.Update(this.tasks[this.selectedTask].id, body).then((res) =>{
      this.tasks[this.selectedTask].title = this.newTask.title;
      this.tasks[this.selectedTask].description = this.newTask.description;
      this.isLoading = false;
      this.OnClickClose();
    }).catch((err) =>{
      this.isLoading = false;
      window.alert(err.status + " " + err.statusText)
    })
  }

}

