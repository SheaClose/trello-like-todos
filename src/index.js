import React from "react";
import { render } from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      currently: "",
      done: "",
      todoList: ["todo1", "todo2", "todo3"],
      currentlyList: ["currently1", "currently2", "currently3"],
      doneList: ["done1", "done2", "done3"]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.move = this.move.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  handleSubmit(e, selector) {
    e.preventDefault();
    let newList = this.state[selector + "List"].slice();
    newList.push(this.state[selector]);
    this.setState({ [selector + "List"]: newList, [selector]: "" });
  }
  move(ind, comingFrom, goingTo) {
    // debugger;
    let oldList = this.state[comingFrom].slice();
    let [item] = oldList.splice(ind, 1);
    let newList = this.state[goingTo].slice();
    newList.push(item);
    let newState = Object.assign({}, this.state, {
      [comingFrom]: oldList,
      [goingTo]: newList
    });
    console.log("newState: ", newState);
    this.setState(newState);
  }
  render() {
    let { todoList, currentlyList, doneList } = this.state;
    console.log("todoList: ", todoList);

    let todos = todoList.map((todo, ind) => {
      return (
        <div key={ind}>
          {todo}
          <button onClick={() => this.move(ind, "todoList", "currentlyList")}>
            Next
          </button>
        </div>
      );
    });

    let currently = currentlyList.map((currently, ind) => {
      return (
        <div key={ind}>
          <button onClick={() => this.move(ind, "currentlyList", "todoList")}>
            Previous
          </button>
          {currently}
          <button onClick={() => this.move(ind, "currentlyList", "doneList")}>
            Next
          </button>
        </div>
      );
    });
    let done = doneList.map((done, ind) => {
      return (
        <div key={ind}>
          <button onClick={() => this.move(ind, "doneList", "currentlyList")}>
            Previous
          </button>
          {done}
        </div>
      );
    });

    return (
      <div className="container">
        <div className="column">
          <form onSubmit={e => this.handleSubmit(e, "todo")}>
            <input
              onChange={this.handleChange}
              value={this.state.todo}
              name="todo"
              type="text"
              placeholder="todo"
            />
            <button>Submit</button>
            <hr />
            {/* {todos} <--- position from which problem was occuring */}
          </form>
          {todos}
        </div>
        <div className="column">
          <form onSubmit={e => this.handleSubmit(e, "currently")}>
            <input
              onChange={this.handleChange}
              name="currently"
              value={this.state.currently}
              type="text"
              placeholder="currently"
            />
            <button>Submit</button>
            <hr />
            {/* {currently} <--- position from which problem was occuring */}
          </form>
          {currently}
        </div>
        <div className="column">
          <form onSubmit={e => this.handleSubmit(e, "done")}>
            <input
              onChange={this.handleChange}
              value={this.state.done}
              name="done"
              type="text"
              placeholder="done"
            />
            <button>Submit</button>
            <hr />
            {/* {done} <--- position from which problem was occuring */}
          </form>
          {done}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
