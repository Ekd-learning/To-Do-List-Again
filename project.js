import { ToDo } from "./todo.js";

class Project {
  static counter = 0;
  #title;
  #dueDate;
  #priority;
  #todoList;
  #id;
  constructor(
    title = "The Project",
    dueDate = `${new Date().toJSON().slice(0, 10)}`,
    priority = "low",
    id = crypto.randomUUID()
  ) {
    this.#title = title;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#todoList = [];
    this.#id = id;
    // this.#todoList.push(new ToDo());
    Project.counter++;
    console.log("Addect project with id: ", this.#id);
  }
  getTitle() {
    return this.#title;
  }
  getDueDate() {
    return this.#dueDate;
  }
  getPriority() {
    return this.#priority;
  }
  setTitle(newTitle) {
    this.#title = newTitle;
  }
  setDueDate(newDueDate) {
    this.#dueDate = newDueDate;
  }
  setPriority(newPriority) {
    this.#priority = newPriority;
  }
  getID() {
    return this.#id;
  }
  print() {
    console.log(
      "title:",
      this.#title,
      "\ndue date:",
      this.#dueDate,
      "\npriority:",
      this.#priority
    );
  }
  addTask(task) {
    this.#todoList.push(task);
  }
  getTasks() {
    // sort each time user switches back to the project from another project
    this.sortTasks();
    return this.#todoList;
  }
  sortTasks() {
    this.#todoList.sort(
      (task1, task2) =>
        new Date(task1.getDueDate()) - new Date(task2.getDueDate())
    );
  }
  findTaskIndex(id) {
    for (let i = 0; i < this.#todoList.length; i++) {
      if (this.#todoList[i].getID() === id) {
        return i;
      }
    }
    return -1;
  }
  removeTask(id) {
    const index = this.findTaskIndex(id);
    console.log("index:", index);
    if (index >= 0) {
      console.log("before removing the task: ", this.#todoList);
      this.#todoList.splice(index, 1);
      console.log("after removing the task: ", this.#todoList);
    }
  }
}

export { Project };
