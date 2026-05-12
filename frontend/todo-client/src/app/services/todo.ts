import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root',
})
export class Todo {
  private readonly apiUrl = 'http://localhost:5062/api/todos';

  constructor(private http:HttpClient) {}

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  createTodo(title: String, description: String): Observable<TodoItem>{
    return this.http.post<TodoItem>(this.apiUrl, {title, description});
  }

  deleteTodo(id:String): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleTodo(id:String): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}/${id}/toggle`,{});
  }
}
