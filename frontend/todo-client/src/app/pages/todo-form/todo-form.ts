import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Todo } from '../../services/todo';

@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss'
})
export class TodoForm implements OnInit {
  errorMessage = signal('');
  isSubmitting = signal(false);
  isEditMode = signal(false);
  isLoading = signal(false);
  todoId = signal<string | null>(null);

  todoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todoService: Todo,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.todoId.set(id);
      this.isEditMode.set(true);
      this.loadTodo(id);
    }
  }

  get titleControl() {
    return this.todoForm.get('title')!;
  }

  get descriptionControl() {
    return this.todoForm.get('description')!;
  }

  loadTodo(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.todoService.getTodoById(id).subscribe({
      next: (todo) => {
        this.todoForm.patchValue({
          title: todo.title,
          description: todo.description
        });

        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load task details.');
        this.isLoading.set(false);
      }
    });
  }

  submitForm(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const title = this.todoForm.value.title?.trim() ?? '';
    const description = this.todoForm.value.description?.trim() ?? '';

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    if (this.isEditMode()) {
      const id = this.todoId();

      if (!id) {
        this.errorMessage.set('Invalid task selected.');
        this.isSubmitting.set(false);
        return;
      }

      this.todoService.updateTodo(id, title, description).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.errorMessage.set('Unable to update task. Please try again.');
          this.isSubmitting.set(false);
        }
      });

      return;
    }

    this.todoService.createTodo(title, description).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage.set('Unable to save task. Please try again.');
        this.isSubmitting.set(false);
      }
    });
  }
}