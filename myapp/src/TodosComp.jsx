import { useState, useEffect } from "react";
import { getUserTodos } from "./utils";
import TodoComp from "./TodoComp";

const TodosComp = ({ userId }) => {
  const [userTodos, setUserTodos] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await getUserTodos(userId);
      setUserTodos(data);
    };
    getTodos();
  }, []);

  const toggleTodo = () => {
    setToggle(false);
    setToggleAdd(true);
  };

  const addTodo = () => {
    let taskId = 1;
    if (userTodos.length > 0) {
      let taskId = userTodos[userTodos.length - 1].id;
    }
    const newTask = { id: taskId + 1, title: newTaskTitle, completed: false };
    setUserTodos([...userTodos, newTask]);
    setToggleAdd(false);
    setToggle(true);
  };

  const cancelAction = () => {
    setToggleAdd(false);
    setToggle(true);
  };

  return (
    <div className="todosChild">
      Todos - User {userId}
      <button onClick={toggleTodo}>Add</button>
      {toggle && (
        <>
          {userTodos.map((todo) => {
            return <TodoComp key={todo.id} todo={todo} />;
          })}
        </>
      )}
      {toggleAdd && (
        <>
          <br />
          <br />
          Title: <input type="text" onChange={(e) => setNewTaskTitle(e.target.value)} />
          <br />
          <button onClick={cancelAction}>Cancel</button>
          <button onClick={addTodo}>Add</button>
        </>
      )}
    </div>
  );
};

export default TodosComp;
