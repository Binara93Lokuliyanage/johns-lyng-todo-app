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
export class App{
  todos = signal<TodoItem[]>([]);
  newTodoTitle = signal('');
  newTodoDescription = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private todoService: Todo){}

 

}
