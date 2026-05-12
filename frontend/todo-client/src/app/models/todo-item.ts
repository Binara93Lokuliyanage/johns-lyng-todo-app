import { Timestamp } from "rxjs";

export interface TodoItem {
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    createdAt: string;
}
