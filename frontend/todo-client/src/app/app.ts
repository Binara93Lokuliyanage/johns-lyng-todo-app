import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoItem } from './models/todo-item';
import { Todo } from './services/todo';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  todos = signal<TodoItem[]>([]);
  newTodoTitle = signal('');
  newTodoDescription = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private todoService: Todo){}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.todoService.getTodos().subscribe({
      next:(todos)=>{
        this.todos.set(todos);
        this.isLoading.set(false);
      },
      error:()=>{
        this.errorMessage.set('Unable to load Todo items');
        this.isLoading.set(false);
      }
    });
  }

  addTodo(): void {
    const title = this.newTodoTitle().trim();
    const description = this.newTodoDescription().trim();

    if(!title){
      this.errorMessage.set('Todo title is required');
      return;
    }

    if(!description) {
      this.errorMessage.set('Todo description is required');
      return;
    }

    this.todoService.createTodo(title, description).subscribe({
      next: (todo)=> {
        this.todos.update((items) => [todo, ...items]);
        this.newTodoTitle.set('');
        this.newTodoDescription.set('');
        this.errorMessage.set('');
      },
      error: ()=> {
        this.errorMessage.set('Adding Todo item is unsuccessful !')
      }
    });

  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos.update((items) => items.filter((todo) => todo.id !== id));
      },
      error: () => {
        this.errorMessage.set('Deleting Todo Item is unsuccessful!')
      }
    });
  }

   toggleTodo(id: string): void {
    this.todoService.toggleTodo(id).subscribe({
      next: (updatedTodo) => {
        this.todos.update((items) =>
          items.map((todo) => todo.id === id ? updatedTodo : todo)
        );
      },
      error: () => {
        this.errorMessage.set('Unable to update TODO item. Please try again.');
      }
    });
  }

}
