"use strict";
import "./styles.css";
import { ToDo } from "./todo.js";
import { Project } from "./project.js";
import {
  addProject,
  addTask,
  displayTasks,
  removeTask,
} from "./UIController.js";
const projects = document.querySelector(`.projects_list`);
const todos = document.querySelector(`.todos_container`);
const newProjectBtn = document.querySelector(`#submit-project-btn`);
let projectCounter = 0;
let taskCounter = 0;
const projectsList = [];
let currentProject = null;

const findProjectIndex = function (id) {
  for (let i = 0; i < projectsList.length; i++) {
    if (projectsList[i].getID() === id) {
      return i;
    }
  }
  return -1;
};

// const pr = new Project();
// pr.print();
// addProject("0", pr.getTitle());
newProjectBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const projectField = document.getElementById("project-name");
  const projectTitle =
    projectField.value === "" ? undefined : projectField.value; // get input
  projectField.value = ""; // clear input field
  const project = new Project(projectTitle, undefined, "high");
  addProject(project.getID(), projectTitle, project.getPriority());
  projectCounter++;
  projectsList.push(project);
  currentProject = project;
  //document.querySelector(`#project-name`).blur(); // unnecessary
});

document.addEventListener("click", function (e) {
  const target = e.target;
  console.log("target:", target);
  console.log("Current project is: ", currentProject);
  if (target.classList[1] === "delete-btn") {
    // could need some fixing as we dont remove projects from the projectsList
    // deleting project (maybe make a case for delete-btn for tasks)
    projects.removeChild(target.closest(`#project-${target.classList[0]}`));
  }
  if (target.classList[0] === "newTaskBtn") {
    todos.childNodes[1].firstChild.classList.toggle("hidden"); // show modal window
  }
  if (target.classList[0] === "addTaskBtn") {
    e.preventDefault();
    const taskTitle = // title
      document.getElementsByName("task-name")[0].value === ""
        ? undefined
        : document.getElementsByName("task-name")[0].value;
    const taskDescr = // description
      document.getElementsByName("task-descr")[0].value === ""
        ? undefined
        : document.getElementsByName("task-descr")[0].value;
    const taskNotes = // notes
      document.getElementsByName("task-notes")[0].value === ""
        ? undefined
        : document.getElementsByName("task-notes")[0].value;
    const taskDue = // due date
      document.getElementsByName("task-dueDate")[0].value === ""
        ? undefined
        : document.getElementsByName("task-dueDate")[0].value;
    const task = new ToDo(
      taskTitle,
      taskDescr,
      taskDue,
      taskNotes,
      false,
      undefined,
      currentProject.getID()
    );
    console.log(
      "adding task: ",
      task.getTitle(),
      task.getDescription(),
      task.getDueDate(),
      task.getNotes(),
      task.getID()
    );
    console.log(
      "ADDING TASK TO THE DOM:",
      "\n",
      task.getID(),
      "\n",
      task.getProjectID(),
      "\n",
      task.getTitle()
    );
    addTask(
      // todos.firstChild.firstChild.id,
      task.getID(),
      task.getProjectID(),
      task.getTitle(),
      task.getDescription(),
      task.getDueDate(),
      task.getNotes()
    );
    // console.log("projectsList: ", projectsList);
    console.log("The To Do: ", todos.children[2]);
    projectsList[findProjectIndex(task.getProjectID())].addTask(task);
  }
  if (
    // remove task from DOM && projectsList
    target.classList &&
    target.classList.length > 0 &&
    target.classList[0].slice(0, 15) === "delete-task-btn"
  ) {
    console.log("task classlist:", target.classList);
    console.log("deleting task id: ", target.id); //target.classList[0].slice(16));
    // currentProject.removeTask(target.classList[0].slice(16));
    currentProject.removeTask(target.id);
    console.log("current project todolist: ", currentProject.getTasks());
    removeTask(target.closest(".task"));
  }
  if (target.type === "checkbox") {
    target.closest(".task").classList.toggle("completed");
  }
  if (target.id.slice(0, 7) === "project") {
    currentProject = projectsList[findProjectIndex(target.id.slice(8))];
    displayTasks(projectsList[findProjectIndex(target.id.slice(8))]);
    console.log("saving");
  }
});
// addTask("project_id", "1", "task_title", "task_descr", "01/01/2025", "notes");
