import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TodoItem } from '../../models/todo-item';
import { Todo } from '../../services/todo';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList implements OnInit {
  todos = signal<TodoItem[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  expandedDescriptions = signal<Record<string, boolean>>({});

  constructor(private todoService: Todo) { }

  toggleDescription(id: string): void {
    this.expandedDescriptions.update((state) => ({
      ...state,
      [id]: !state[id]
    }));
  }

  isDescriptionExpanded(id: string): boolean {
    return !!this.expandedDescriptions()[id];
  }

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
