import axios from "axios";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";

const getAllUsers = () => axios.get(usersUrl);

const getUserTodos = (id) => axios.get(`${todosUrl}?userId=${id}&_limit=3`);

const getUserPosts = (id) => axios.get(`${postsUrl}?userId=${id}&_limit=3`);

const updateUser = (id, body) => axios.patch(`${usersUrl}/${id}`, body);

const deleteUser = (id) => axios.delete(`${usersUrl}/${id}`);

export { getAllUsers, getUserTodos, getUserPosts, updateUser, deleteUser };
