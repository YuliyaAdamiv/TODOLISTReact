import React, {useState} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  let todoItems = [];
  let active = [];
  const AddActiveTodo = () => {
    active = [];
    for (const i in todos) {
      if (!todos[i].isComplete) {
        active.push(todos[i]);
      }
    }
    const [actives, toggleActive] = React.useState(true);

    return (
      <div>
        <button className="btns" onClick={() => toggleActive(!actives)}>
          Active tasks: {actives ? 'active' : 'hide'}
        </button>
        {actives && (
          <div>
            <Todo
              todos={active}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </div>
        )}
      </div>
    );
  };
  const AddComplitedTodo = () => {
    todoItems = [];
    for (const j in todos) {
      if (todos[j].isComplete === true) {
        todoItems.push(todos[j]);
      }
    }
    const [show, toggleShow] = React.useState(true);

    return (
      <div>
        <button className="btns" onClick={() => toggleShow(!show)}>
          Completed tasks: {show ? 'active' : 'hide'}
        </button>
        {show && (
          <div>
            {' '}
            <Todo
              todos={todoItems}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </div>
        )}
      </div>
    );
  };
  const AddAllTodo = () => {
    const [all, toggleAll] = React.useState(true);

    return (
      <div>
        <button className="btns" onClick={() => toggleAll(!all)}>
          All tasks: {all ? 'active' : 'hide'}
        </button>
        {all && (
          <div>
            {' '}
            <Todo
              todos={todos}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </div>
        )}
      </div>
    );
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
        <AddActiveTodo className="btns" />

        <AddComplitedTodo className="btns" />

        <AddAllTodo className="btns" />
      </div>
    </div>
  );
}

export default TodoList;
