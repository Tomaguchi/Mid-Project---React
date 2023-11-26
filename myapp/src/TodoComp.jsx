const TodoComp = ({ todo }) => {
  const completeTask = () => {
    todo.completed = true;
  };

  return (
    <div className="todoComp">
      Title: {todo.title} <br />
      Conpleted: {todo.completed.toString()}
      <br />
      {!todo.completed && <button onClick={completeTask}>Mark Completed</button>}
    </div>
  );
};

export default TodoComp;
