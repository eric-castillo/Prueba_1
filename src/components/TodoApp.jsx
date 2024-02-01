import { useState } from "react";
import TodoElement from "./Todos/TodoElement";
import TodoCompleted from "./Todos/TodoCompleted";
import "./todoApp.css";

export default function TodoApp() {
  const [allShow, setAllShow] = useState(false);
  const [activeShow, setActiveShow] = useState(true);
  const [completedShow, setCompletedShow] = useState(false);

  const [todoContent, setTodoContent] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosCompleted, setTodosCompleted] = useState([]);

  // VIEW FUNCTIONS
  function handleAllView() {
    setAllShow(true);
    setActiveShow(false);
    setCompletedShow(false);
  }
  function handleActiveView() {
    setAllShow(false);
    setActiveShow(true);
    setCompletedShow(false);
  }
  function handleCompletedView() {
    setAllShow(false);
    setActiveShow(false);
    setCompletedShow(true);
  }

  function Layout() {
    if (allShow) {
      return allTodos.map((todo) => (
        <TodoCompleted key={todo.id} value={todo.content} />
      ));
    } else if (activeShow) {
      return allTodos.map((todo) =>
        !todo.completed ? (
          <TodoElement
            key={todo.id}
            value={todo.content}
            onChange={() => handleCompletedTodo(todo.id)}
          />
        ) : (
          <></>
        )
      );
    } else {
      return todosCompleted.map((todo) => (
        <TodoCompleted key={todo.id} value={todo.content} />
      ));
    }
  }

  // COMPLETED TODOS FUNCTIONS
  function handleCompletedTodo(id) {
    const completedTodoIndx = allTodos.findIndex(
      (todoElem) => todoElem.id === id
    );

    allTodos[completedTodoIndx].completed = true;

    const temp = [...todosCompleted];
    const newTodoCompleted = allTodos[completedTodoIndx];
    temp.unshift(newTodoCompleted);

    setTodosCompleted(temp);
  }

  // SUBMIT TODO FUNCTIONS

  function handleInputChange(e) {
    e.preventDefault();

    const value = e.target.value;
    setTodoContent(value);
  }

  function submitTodoHandler(e) {
    e.preventDefault();

    const newTodo = {
      content: todoContent,
      id: crypto.randomUUID(),
      completed: false,
    };

    const temp = [...allTodos];
    temp.unshift(newTodo);

    setAllTodos(temp);
    setTodoContent("");
  }

  return (
    <div className="todo-list">
      <h1>
        THINGS TO DO{" "}
        <span className="todo-count">
          {allTodos.filter((todo) => !todo.completed).length} items left
        </span>
      </h1>
      <form className="todoCreateForm" onSubmit={submitTodoHandler}>
        <input
          value={todoContent}
          placeholder="Add New"
          className="todoInput"
          onChange={handleInputChange}
        />
        <input
          type="submit"
          value="Create Todo"
          className="buttonCreate"
          onClick={submitTodoHandler}
        />
      </form>
      <ul>
        <Layout />
      </ul>
      <button onClick={handleAllView}>All</button>
      <button onClick={handleActiveView}>Active</button>
      <button onClick={handleCompletedView}>Completed</button>
    </div>
  );
}
