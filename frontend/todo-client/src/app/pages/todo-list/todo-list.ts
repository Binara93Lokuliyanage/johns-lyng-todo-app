import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TodoItem } from '../../models/todo-item';
import { Todo } from '../../services/todo';

type TodoFilter = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList implements OnInit {
  todos = signal<TodoItem[]>([]);
  activeFilter = signal<TodoFilter>('all');
  expandedDescriptions = signal<Record<string, boolean>>({});
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private todoService: Todo) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos.set(todos);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load tasks. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  setFilter(filter: TodoFilter): void {
    this.activeFilter.set(filter);
  }

  filteredTodos(): TodoItem[] {
    const filter = this.activeFilter();

    if (filter === 'completed') {
      return this.todos().filter((todo) => todo.isDone);
    }

    if (filter === 'pending') {
      return this.todos().filter((todo) => !todo.isDone);
    }

    return this.todos();
  }

  toggleDescription(id: string): void {
    this.expandedDescriptions.update((state) => ({
      ...state,
      [id]: !state[id]
    }));
  }

  isDescriptionExpanded(id: string): boolean {
    return !!this.expandedDescriptions()[id];
  }

  toggleTodo(id: string): void {
    this.todoService.toggleTodo(id).subscribe({
      next: (updatedTodo) => {
        this.todos.update((items) =>
          items.map((todo) => todo.id === id ? updatedTodo : todo)
        );
      },
      error: () => {
        this.errorMessage.set('Unable to update task status.');
      }
    });
  }

  deleteTodo(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this task?');

    if (!confirmed) {
      return;
    }

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos.update((items) => items.filter((todo) => todo.id !== id));
      },
      error: () => {
        this.errorMessage.set('Unable to delete task.');
      }
    });
  }
}