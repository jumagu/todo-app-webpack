import { todoList } from "..";
import { Todo } from "../classes";

// HTML references
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnDeleteCompleted = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const anchorFilters = document.querySelectorAll(".filtro");

export const createTodoHtml = (todo) => {
  const { done, description, id } = todo;

  const html = `
        <li class="${done ? "completed" : ""}" data-id="${id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${
                  done ? "checked" : ""
                } />
                <label>${description}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

  const div = document.createElement("div");
  div.innerHTML = html;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};

// Events
txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const newTodo = new Todo(txtInput.value);
    todoList.newTodo(newTodo);
    createTodoHtml(newTodo);
    txtInput.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  const elementName = event.target.localName;
  const todoElement = event.target.parentElement.parentElement;
  const todoId = todoElement.getAttribute("data-id");

  if (elementName.includes("input")) {
    todoList.changeState(todoId);
    todoElement.classList.toggle("completed");
  } else if (elementName.includes("button")) {
    todoList.deleteTodo(todoId);
    divTodoList.removeChild(todoElement);
  }
});

btnDeleteCompleted.addEventListener("click", () => {
  todoList.deleteCompleted();
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const element = divTodoList.children[i];
    if (element.classList.contains("completed")) {
      divTodoList.removeChild(element);
    }
  }
});

ulFilters.addEventListener("click", (event) => {
  const filter = event.target.text;

  if (!filter) return;

  anchorFilters.forEach((element) => element.classList.remove("selected"));
  event.target.classList.add("selected");

  for (const element of divTodoList.children) {
    element.classList.remove("hidden");
    const completed = element.classList.contains("completed");

    switch (filter) {
      case "Pendientes":
        if (completed) element.classList.add("hidden");
        break;

      case "Completados":
        if (!completed) element.classList.add("hidden");
        break;
    }
  }
});
