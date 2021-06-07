import React, { useState } from "react";
import { Checkbox } from "@material-ui/core";
///////////////////////////////   Each todo task list item function    //////////////////////////////////////////////
const Todo = ({ todo, deleteTodoItem, updateTodoItem }) => {
  var [_, update] = useState('');
  const handleChange = async (event) => {
    let e = event.target.checked;
    let res = await updateTodoItem(todo.id);
    
    if (res === -1) {
      // setCompleted(!e);
      // todo.isCompleted = !e;
    }
    if (res === 200) {
     
      todo.isCompleted = e;
      update(todo.isCompleted);
    }

  };
  async function delete_todo() {
    await deleteTodoItem(todo.id);
    console.log("deleted ", todo.title);
  }

  function getTaskTitle() {
    let task;
    if (todo.isCompleted) {
      // Completed Tasks
      task = (
        <div className="todo-completed">
          <div className="task">{todo.title}</div>
        </div>
      );
    } // uncompleted tasks
    else {
      task = (
        <div className="todo-uncompleted">
          <div className="task">{todo.title}</div>
        </div>
      );
    }
    return task;
  }

  return (
    <div className="todo-item">
      <Checkbox
      
        checked={todo.isCompleted}
        id="checkbox"
        style={{
          color: "#FEAE65",
        }}
        onChange={handleChange}
        inputProps={{ "aria-label": "danger checkbox" }}
      />

      {getTaskTitle()}
      <button id="delete-btn" onClick={delete_todo}>
        Delete
      </button>
    </div>
  );
};
/////////////////////////////// ///////////////////////////////  ///////////////////////////////

export default Todo;
