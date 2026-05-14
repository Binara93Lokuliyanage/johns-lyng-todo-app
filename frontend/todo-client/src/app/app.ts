import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoItem } from './models/todo-item';
import { Todo } from './services/todo';
import {
  LucideAngularModule,
  List,
  PlusIcon,
  ListCheckIcon
} from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLinkActive, RouterLink, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
  todos = signal<TodoItem[]>([]);
  newTodoTitle = signal('');
  newTodoDescription = signal('');
  isLoading = signal(false);
  errorMessage = signal('');
  readonly List = List;
  readonly Plus = PlusIcon;
  readonly ListCheck = ListCheckIcon;

  constructor(private todoService: Todo){}

 

}
