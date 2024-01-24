import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-todo-app';
  readonly APIUrl = "http://localhost:3000/api/todo"

  constructor(private http: HttpClient){

  }

  todos:any=[];
  refreshTodos(){
    this.http.get(this.APIUrl).subscribe(data=>{
      this.todos=data;
    })
  }

  ngOnInit(){
    this.refreshTodos();
  }

  addTodo(){
    const title = (<HTMLInputElement>document.getElementById("todoTitle")).value;

    const formData = new FormData();
    formData.append("title", title);

    this.http.post(this.APIUrl, formData).subscribe(data=>{
      alert(data);
      this.refreshTodos();
    });

  }

  deleteTodo(id: string){
    this.http.delete(this.APIUrl+'?id='+id).subscribe(data=>{
      alert(data);
      this.refreshTodos();
    });
  }
}
