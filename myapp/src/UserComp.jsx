import { useState, useEffect } from "react";
import "./userComp.css";
import { getUserPosts, getUserTodos, updateUser, deleteUser } from "./utils";
import TodosComp from "./TodosComp";
import PostsComp from "./PostsComp";

const UserComp = ({ user }) => {
  const [userTodos, setUserTodos] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [todosStates, setTodosStates] = useState([]);
  const [initialValueName, setInitialValueName] = useState(user.name);
  const [initialValueEmail, setInitialValueEmail] = useState(user.email);
  const [initialValueStreet, setInitialValueStreet] = useState(
    user.address && user.address.street ? user.address.street : ""
  );
  const [initialValueCity, setInitialValueCity] = useState(
    user.address && user.address.city ? user.address.city : ""
  );
  const [initialValueZipCode, setInitialValueZipCode] = useState(
    user.address && user.address.zipcode ? user.address.zipcode : ""
  );
  const [showOtherData, setShowOtherData] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [showTodos, setShowTodos] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const getUserTodosAndPosts = async () => {
      const { data: todos } = await getUserTodos(user.id);
      setUserTodos(todos);

      const { data: posts } = await getUserPosts(user.id);
      setUserPosts(posts);

      const todosState = todos.map((todo) => todo.completed);
      setTodosStates(todosState);
    };
    getUserTodosAndPosts();
  }, []);

  const addOtherData = () => {
    setShowOtherData(true);
  };

  const handleDivClick = () => {
    setShowOtherData(!showOtherData);
  };

  const update = async () => {
    const { data } = await updateUser(user.id, {
      name: initialValueName,
      email: initialValueEmail,
      address: {
        street: initialValueStreet,
        city: initialValueCity,
        zipcode: initialValueZipCode,
      },
    });
    console.log(data);
  };

  const deleteUser = () => {
    setShowDiv(false);
    setShowTodos(false);
  };

  const activateDev = () => {
    setActive(!active);
    setShowTodos(!showTodos);
  };

  return (
    <div>
      {showDiv && (
        <div
          className={`${
            todosStates.every((item) => item === true) ? "complete" : "incomplete"
          } ${active ? "active" : ""} `}
        >
          <span onClick={activateDev}>ID: {user.id}</span>
          <br />
          Name:{" "}
          <input
            type="text"
            value={initialValueName}
            onChange={(e) => setInitialValueName(e.target.value)}
          />{" "}
          <br />
          Email:{" "}
          <input
            type="text"
            value={initialValueEmail}
            onChange={(e) => setInitialValueEmail(e.target.value)}
          />
          <br /> <br />
          <button onMouseOver={addOtherData}>Other Data</button>
          <button onClick={update}>Update</button>
          <button onClick={deleteUser}>Delete</button>
          <br />
          <br />
          {showOtherData && (
            <div className="otherDataDiv" onClick={handleDivClick}>
              Street:{" "}
              <input
                type="text"
                value={initialValueStreet}
                onChange={(e) => setInitialValueStreet(e.target.value)}
              />
              <br />
              City:{" "}
              <input
                type="text"
                value={initialValueCity}
                onChange={(e) => setInitialValueCity(e.target.value)}
              />
              <br />
              Zip Code:{" "}
              <input
                type="text"
                value={initialValueZipCode}
                onChange={(e) => setInitialValueZipCode(e.target.value)}
              />
              <br />
            </div>
          )}
        </div>
      )}
      <br />
      {showTodos && (
        <>
          <TodosComp key={user.id} userId={user.id} />
          <PostsComp userId={user.id} />
        </>
      )}
    </div>
  );
};

export default UserComp;
