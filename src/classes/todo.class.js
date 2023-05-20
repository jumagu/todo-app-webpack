export class Todo {
  static fromJSON({ id, description, done, createdAt }) {
    const tempTodo = new Todo(description);
    tempTodo.id = id;
    tempTodo.done = done;
    tempTodo.createdAt = createdAt;

    return tempTodo;
  }

  constructor(description) {
    this.id = new Date().getTime();
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
