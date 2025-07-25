class ToDo {
  #title;
  #description;
  #dueDate;
  #priority;
  #notes;
  #checklist;
  #id;
  #projectID;
  constructor(
    title = "The Task",
    description = "No description",
    dueDate = `${new Date().toJSON().slice(0, 10)}`,
    notes = "No notes",
    checklist = false,
    id = crypto.randomUUID(),
    projectID = null
  ) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#notes = notes;
    this.#checklist = checklist;
    this.#id = id;
    this.#projectID = projectID;
    console.log("added task with id: ", this.#id);
  }
  getTitle() {
    return this.#title;
  }
  getDescription() {
    return this.#description;
  }
  getDueDate() {
    return this.#dueDate;
  }
  getNotes() {
    return this.#notes;
  }
  getCheckList() {
    return this.#checklist;
  }
  setTitle(newTitle) {
    this.#title = newTitle;
  }
  setDescription(newDescription) {
    this.#description = newDescription;
  }
  setDueDate(newDueDate) {
    this.#dueDate = newDueDate;
  }
  setNotes(newNotes) {
    this.#notes = newNotes;
  }
  getID() {
    return this.#id;
  }
  getProjectID() {
    return this.#projectID;
  }
  #setCheckList(newCheckList) {
    this.#checklist = newCheckList;
  }
  toggleCheckList() {
    this.#checklist = !this.#checklist;
  }
  print() {
    console.log(
      "title:",
      this.#title,
      "\ndescription:",
      this.#description,
      "\ndue date:",
      this.#dueDate,
      "\npriority:",
      this.#priority,
      "\nnotes:",
      this.#notes,
      "\nchecklist(done):",
      this.#checklist
    );
  }
}

export { ToDo };
