import { useState, useEffect } from "react";
import { getAllUsers } from "./utils";
import UserComp from "./UserComp";

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [toggleAddUser, setToggleAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await getAllUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getFilteredUsers = async () => {
      const { data } = await getAllUsers();
      const fUsers = data.filter(
        (user) => user.name.includes(search) || user.email.includes(search)
      );
      setFilteredUsers(fUsers);
    };
    getFilteredUsers();
  }, [search]);

  const addNewUser = () => {
    setToggleAddUser(true);
  };

  const cancelAction = () => {
    setToggleAddUser(false);
  };

  const addUser = () => {
    const userId = users[users.length - 1].id;
    const newUser = { id: userId + 1, name: newUserName, email: newUserEmail };
    setUsers([...users, newUser]);
    setToggleAddUser(false);
  };

  return (
    <>
      Search <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={addNewUser}>Add</button>
      <br /> <br />
      {search === ""
        ? users.map((user) => {
            return <UserComp key={user.id} user={user} />;
          })
        : filteredUsers.map((user) => {
            return <UserComp key={user.id} user={user} />;
          })}
      {toggleAddUser && (
        <div className="newUserDiv">
          Add New User
          <div className="border">
            Name: <input type="text" onChange={(e) => setNewUserName(e.target.value)} />
            <br />
            Email: <input type="text" onChange={(e) => setNewUserEmail(e.target.value)} />
            <br />
            <br />
            <button onClick={cancelAction}>Cancel</button>
            <button onClick={addUser}>Add</button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
