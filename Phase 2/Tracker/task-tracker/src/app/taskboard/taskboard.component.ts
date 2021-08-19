import { Component, OnInit } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { Task } from '../tasks.model';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.css']
})
export class TaskboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  taskList:Array<Task>= new Array();

  taskRef = new FormGroup({
    newId: new FormControl(""),
    newName: new FormControl(""),
    newTask : new FormControl(""),
    newDeadline:new FormControl("")
  })
  msg?:string=""

  addTask(){
    let toAdd=this.taskRef.value;
    console.log(toAdd);
    let newTask = new Task(toAdd.newId,toAdd.newName,toAdd.newTask,toAdd.newDeadline);
    this.taskList.push(newTask);
    console.log(this.taskList);    
  }

  displayTask(){
 
  }

}
