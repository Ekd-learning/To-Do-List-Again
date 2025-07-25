import { Project } from "./project.js";
import { ToDo } from "./todo.js";
const projects = document.querySelector(`.projects_list`);
const todos = document.querySelector(`.todos_container`);
const addProject = function (id, title = "The Project", priority) {
  const project_div = document.createElement("div");
  project_div.appendChild(document.createTextNode(title));
  project_div.classList.add(`project`);
  project_div.classList.add(priority);
  project_div.setAttribute("id", `project-${id}`);

  const button_div = document.createElement("div"); // create container
  button_div.classList.add("project-btns-container");
  const delete_project_btn = document.createElement("button"); // create delete btn
  delete_project_btn.classList.add(id); // to find the project element easier. might not even need it at all
  delete_project_btn.classList.add("delete-btn");
  delete_project_btn.textContent = `Delete`;
  const edit_project_btn = document.createElement("button"); // create edit btn
  edit_project_btn.classList.add(id);
  edit_project_btn.classList.add("edit-btn");
  edit_project_btn.textContent = "Edit";
  button_div.appendChild(edit_project_btn);
  button_div.appendChild(delete_project_btn); // pack buttons in 1 div

  projects.appendChild(project_div);
  project_div.appendChild(button_div);

  const taskBtn_div = document.createElement("div"); // add this to todos container
  taskBtn_div.classList.add("taskBtn_container");
  const newTaskBtn = document.createElement("button");
  newTaskBtn.classList.add("newTaskBtn");
  newTaskBtn.setAttribute("id", id);
  if (todos.firstChild !== null) {
    // don't add the button if there's 1 already
    todos.firstChild.firstChild.id = id; // first child of todos is btn container, and we need the button!
    return;
  }
  newTaskBtn.classList.add("newTaskBtn");
  newTaskBtn.textContent = "New Task";
  taskBtn_div.appendChild(newTaskBtn);

  // create modal window
  const taskInput_div = document.createElement("div");
  taskInput_div.classList.add("modal");
  // taskBtn_div.classList.add("modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.classList.add("hidden"); // by default
  // creating input form
  const form = document.createElement("form");
  const input_title = document.createElement("input"); // title
  input_title.setAttribute("type", "text");
  input_title.setAttribute("name", "task-name");
  input_title.setAttribute("placeholder", "Task Title");
  const title_label = document.createElement("label");
  title_label.setAttribute("for", "task-name");
  title_label.textContent = "Title:";
  const input_descr = document.createElement("input"); // description
  input_descr.setAttribute("type", "text");
  input_descr.setAttribute("name", "task-descr");
  input_descr.setAttribute("placeholder", "Task Description");
  const descr_label = document.createElement("label");
  descr_label.setAttribute("for", "task-descr");
  descr_label.textContent = "Description:";
  const input_notes = document.createElement("input"); // notes
  input_notes.setAttribute("type", "text");
  input_notes.setAttribute("name", "task-notes");
  input_notes.setAttribute("placeholder", "Task Notes");
  const notes_label = document.createElement("label");
  notes_label.setAttribute("for", "task-notes");
  notes_label.textContent = "Notes:";
  const input_dueDate = document.createElement("input"); // due date
  input_dueDate.setAttribute("type", "date");
  input_dueDate.setAttribute("name", "task-dueDate");
  input_dueDate.setAttribute("min", "2025-01-01");
  input_dueDate.setAttribute("max", "2055-12-31");
  const dueDate_label = document.createElement("label");
  dueDate_label.setAttribute("for", "task-dueDate");
  dueDate_label.textContent = "Due:";
  const addTaskBtn = document.createElement("button"); // submit the form
  addTaskBtn.setAttribute("type", "submit");
  addTaskBtn.classList.add("addTaskBtn");
  addTaskBtn.textContent = "Add Task!";
  form.appendChild(title_label);
  form.appendChild(input_title);
  form.appendChild(descr_label);
  form.appendChild(input_descr);
  form.appendChild(notes_label);
  form.appendChild(input_notes);
  form.appendChild(dueDate_label);
  form.appendChild(input_dueDate);
  form.appendChild(addTaskBtn);

  modalContent.appendChild(form);
  taskInput_div.appendChild(modalContent);
  todos.appendChild(taskBtn_div);
  todos.appendChild(taskInput_div);
};
const addTask = function (
  id,
  project_id,
  title = "The Task",
  description = "No description",
  dueDate = `${new Date().toJSON().slice(0, 10)}`, // yyyy-mm-dd // ${new Date().toJSON().slice(0, 10)}
  notes = "No notes"
) {
  const task_div = document.createElement("div");
  task_div.setAttribute("id", id);
  // task_div.setAttribute("project_id", project_id);
  task_div.classList.add(project_id);

  const title_div = document.createElement("div");
  title_div.classList.add("task_title");
  title_div.appendChild(document.createTextNode(title));
  task_div.appendChild(title_div);

  const descr_div = document.createElement("div");
  descr_div.classList.add("task_description");
  descr_div.appendChild(document.createTextNode(description));
  task_div.appendChild(descr_div);

  const notes_div = document.createElement("div");
  notes_div.classList.add("task_notes");
  notes_div.appendChild(document.createTextNode(notes));
  task_div.appendChild(notes_div);

  const due_div = document.createElement("div");
  due_div.classList.add("task_dueDate");
  due_div.appendChild(document.createTextNode(dueDate));
  task_div.appendChild(due_div);

  const completion_div = document.createElement("div");
  completion_div.classList.add("task_completion");
  const complete_checkbox = document.createElement("input"); // completion checkbox
  complete_checkbox.setAttribute("type", "checkbox");
  complete_checkbox.setAttribute("name", "task-complete");
  const completion_label = document.createElement("label");
  completion_label.setAttribute("for", "task-complete");
  completion_label.textContent = "Completed:";
  completion_div.appendChild(completion_label);
  completion_div.appendChild(complete_checkbox);
  task_div.appendChild(completion_div);

  const delete_btn_div = document.createElement("div");
  delete_btn_div.classList.add("task-delete-btn-container");
  const delete_btn = document.createElement("button");
  delete_btn.setAttribute("id", id);
  delete_btn.classList.add(`delete-task-btn-${project_id}`);
  delete_btn.textContent = "Delete";
  delete_btn_div.appendChild(delete_btn);
  task_div.appendChild(delete_btn_div);

  task_div.classList.add("task");
  todos.appendChild(task_div);
};
const removeTask = function (task) {
  todos.removeChild(task);
};
const removeAllTasks = function () {
  for (let i = todos.childNodes.length - 1; i >= 0; i--) {
    const element = todos.childNodes[i];
    if (element.classList.contains("task")) todos.removeChild(element);
  }
};

const displayTasks = function (project) {
  console.log("displaying tasks for following project: ", project);
  if (!project) return;
  removeAllTasks();
  const tasks = project.getTasks();
  console.log("tasks to display: ", tasks);
  tasks.forEach((task) =>
    addTask(
      todos.firstChild.firstChild.id, // gotta make sure we update id (on time)!
      0, // idk what to do with it yet
      task.getTitle(),
      task.getDescription(),
      task.getDueDate(),
      task.getNotes()
    )
  );
};

export { addProject, addTask, displayTasks, removeTask };
