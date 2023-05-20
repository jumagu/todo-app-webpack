import { TodoList } from "./classes";
import { createTodoHtml } from "./js/components";
import "./styles.css";

export const todoList = new TodoList();

todoList.todos.forEach(createTodoHtml);