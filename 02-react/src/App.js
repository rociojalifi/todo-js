// hook nativo para definir estado
import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";

import "./App.css";

function loadTasks() {
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }
}

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(loadTasks());

  const handleSubmit = (event) => {
    event.preventDefault();

    // [x] save newTask to state
    // IMPORTANT: concat creates a new array (does not modify the original)
    const next = tasks.concat(newTask);
    setTasks(next);

    // [x] persit newTask to local storage
    localStorage.setItem("tasks", JSON.stringify(next));

    // [x] clean the form
    setNewTask("");
  };

  const deleteTaskById = (id) => {
    // [0...id...n]
    //   ||   ^^^^ tasks.slice(id + 1)
    //  ^^^^ tasks.slice(0, id)

    const before = tasks.slice(0, id);
    const after = tasks.slice(id + 1);

    const next = [...before, ...after];
    setTasks(next);

    localStorage.setItem("tasks", JSON.stringify(next));
  };

  return (
    <div>
      <header>
        <h1>Task list</h1>
      </header>
      <main>
        <form id="new-task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="new-task-input"
            placeholder="What do you have planned?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input type="submit" id="new-task-submit" value="add-task" />
        </form>
        <section className="task-list">
          <h2>Tasks</h2>
          <div id="tasks">
            {tasks.map((task, id) => (
              <div className="tasks">
                <div className="content">
                  <input type="text" className="text" value={task} readOnly />
                </div>
                <div className="actions">
                  <button className="edit">Edit</button>
                  <button
                    className="delete"
                    onClick={(_event) => deleteTaskById(id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

/*
<div className="content">
  <input type="text" className="text" value={newTask} readOnly />
  {'hola'}
  {true}
  {null}
  {123}
  {[
    <input type="text" className="text" value={newTask} readOnly />,
    <input type="text" className="text" value={newTask} readOnly />
  ]}
</div>;

React.createElement("div", { className: "content" }, [
  React.createElement("input", {
    type: "text",
    className: "text",
    value: newTask,
    readOnly: true,
  }),
  'hola',
  true,
  null,
  123,
  [
    React.createElement("input", {
      type: "text",
      className: "text",
      value: newTask,
      readOnly: true,
    }),
    React.createElement("input", {
      type: "text",
      className: "text",
      value: newTask,
      readOnly: true,
    })
  ]
]);
*/
