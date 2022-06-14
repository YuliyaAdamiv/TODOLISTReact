import React, {useState} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(true);
  let todoItems = [];
  let active = [];
  const addActiveTodo = () => {
    for (const i in todos) {
      if (!todos[i].isComplete) {
        active.push(todos[i]);
        console.log(active);
      }
    }
    active = [];
    // setShowTodos(false);
  };
  const addComplitedTodo = () => {
    for (const j in todos) {
      if (todos[j].isComplete === true) {
        todoItems.push(todos[j]);
        console.log(todoItems);
      }
    }
    todoItems = [];
  };
  const addAllTodo = () => {
    console.log(todos);
  };
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(...todos);
  };
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  return (
    <div>
      <h1> What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="container">
        <button className="btns" onClick={addActiveTodo}>
          Active
        </button>
        <button className="btns" onClick={addComplitedTodo}>
          Complited
        </button>
        <button className="btns" onClick={addAllTodo}>
          All
        </button>
      </div>
      {/* {showTodos ? ( */}
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      {/* ) : null} */}
    </div>
  );
}

export default TodoList;
