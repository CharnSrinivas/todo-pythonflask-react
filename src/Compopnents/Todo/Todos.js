import React from "react";
import Date from "./Date";
import Todo from "./Todo";
import { userId, userName } from "../../Containers/App";
import { AddTodo, deleteTodo, updateTodo } from "./TodoHandler";
import { apiUrl } from "../../Containers/App";


import "./todo.css";


// _______________________________ Toatal task list items class  ____________________________________
class Todos extends React.Component {
  constructor() {
    super();
    this.state = {
      addTodoText: "",
      todos: [],
      userData: null,
    };
  }

  async componentDidMount() {
    
    if (userName != "" && userId != "") {
      console.log("comming to todos user: ", userName);
      let data = await await (await fetch(`${apiUrl}/todo/${userId}`)).json();
      this.setState({
        todos: data.tasks,
        userData: data,
      });
      console.log("user Name  ", userName);
    }
    else{
      
    }
  }
  

  handleTextChange = (e) => {
    this.setState({ addTodoText: e.target.value });
  };
  //________________________________  CURD OPERATIONS ___________________________________
  addNewTodo = async () => {
    // positing to database
    let newTodo = await AddTodo(this.state.addTodoText, userId);

    if (newTodo !== -1) {
      this.setState({ todos: [...this.state.todos, newTodo] });
      console.log(this.state.todos);
    } else {
      // show task already exits
      console.log("Task aleary Exits");
    }
  };

  deleteTodoItem = async (taskId) => {
    let res = await deleteTodo(userId, taskId);
    if (res === -1) {
      console.error("Unable to delete");
    }
    if (res === 200) {
      let todos = [];
      this.state.todos.forEach((element) => {
        if (element.id !== taskId) {
          todos.push(element);
        }
      });
      this.setState({ todos: todos });
      // this.setState({
      //   todos: this.state.todos.filter((todo) => todo.id !== taskId),
      // });
    }
    console.log(this.state.todos);
  };
  updateTodoItem = async (taskId) => {
    let res = await updateTodo(userId, taskId);
    return res;
  };
  //____________________________________________________________________________________________________________________________
  render() {
    return (
      <div className="todos-main">
        <Date />
        <div className="add-todo">
          <input placeholder="Task title" onChange={this.handleTextChange} />

          <button type="submit" onClick={this.addNewTodo}>
            Add Task
          </button>
        </div>
        <div className="todo-list">
          {this.state.todos.map((data, index) => (
            <Todo
              key={index}
              todo={data}
              deleteTodoItem={this.deleteTodoItem}
              updateTodoItem={this.updateTodoItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

//____________________________________________________________________________________________________________________________
export default Todos;
