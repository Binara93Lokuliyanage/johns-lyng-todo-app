import { Routes } from '@angular/router';
import { TodoList } from './pages/todo-list/todo-list';
import { TodoForm } from './pages/todo-form/todo-form';

export const routes: Routes = [
    {
        path: '',
        component: TodoList
    },
    {
        path: 'create',
        component: TodoForm
    },
    {
        path: 'edit/:id',
        component: TodoForm
    },
    {
        path: '**',
        redirectTo: ''
    }
];
