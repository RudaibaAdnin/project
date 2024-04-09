import React, { useState, useEffect } from "react";
import axios from "axios";
function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";
    const [todo, setTodo] = useState({id: 1, title: "NodeJS Assignment",
                                        description: "Create a NodeJS server with ExpressJS",
                                        due: "2021-09-09",
                                        completed: false,});
    const [todos, setTodos] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);


    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };

    const deleteTodo = async (todo) => {
        try {
            const response = await axios.delete(
              `${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
          } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
          }
      
    };

    const updateTodo = async () => {
        try {
            const response = await axios.put(
              `${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (
              t.id === todo.id ? todo : t)));
            setTodo({});
          } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
          }
      
      };
    

    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    const removeTodo = async (todo) => {
        const response = await axios.get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };    

    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };

    const fetchTodoById = async (id) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };

    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };
    
    
    useEffect(() => {
      fetchTodos();
    }, []);
  
    return (
      <div>
        <h3>Working with Arrays</h3>

        <h3>Updating an Item in an Array</h3>
        <input className="m-2" value={todo.id}
            onChange={(e) => setTodo({ ...todo,
            id: e.target.value })}/>  <br/>
         <input className="m-2" type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value })}/> <br/>

        <textarea className="m-2" value={todo.description} type="text"
                onChange={(e) => setTodo({ ...todo,
                description: e.target.value })} /> <br/>
        <input className="m-2" value={todo.due} type="date"
            onChange={(e) => setTodo({
            ...todo, due: e.target.value })} /> <br/>
        <label>
            <input className="m-2" value={todo.completed} type="checkbox"
            onChange={(e) => setTodo({
                ...todo, completed: e.target.checked })} />
            Completed
         </label> <br/>
            <button className="btn btn-info m-2" onClick={postTodo} >
                Post Todo
            </button> <br/>

            <button className="btn btn-warning m-2" onClick={postTodo} >
               Update Todo
            </button> <br/>

            <button className="btn btn-primary m-2" onClick={createTodo} >
                Create Todo
            </button> <br/>
            <button className="btn btn-success m-2" onClick={updateTitle} >
                 Update Title
            </button>

            {errorMessage && (
            <div className="alert alert-danger mb-2 mt-2">
            {errorMessage}
            </div>
      )}
        <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input checked={todo.completed}
              type="checkbox" readOnly /> {todo.title}
            <p> {todo.description}</p>
            <p> { todo.due}</p>
            <button className="btn btn-info m-2" onClick={() => fetchTodoById(todo.id)} >
                Edit
            </button>
            <button className="btn btn-danger m-2" onClick={() => removeTodo(todo)} >
            Remove
            </button>

            <button onClick={() => deleteTodo(todo)}
                className="btn btn-danger m-2">
                Delete
            </button>
{/* 
            <button className="btn btn-success m-2" onClick={createTodo} >
                Create Todo
            </button>
            <button className="btn btn-warning m-2" onClick={updateTitle} >
                 Update Title
            </button> */}
          </li>
        ))}
      </ul>



        <h4>Retrieving Arrays</h4>
        <a className="btn btn-primary m-2" href={API}>
          Get Todos
        </a>
        <h4>Retrieving an Item from an Array by ID</h4>
        <input className="m-2" value={todo.id}
            onChange={(e) => setTodo({ ...todo,
            id: e.target.value })}/>
        <a className="btn btn-primary m-2" href={`${API}/${todo.id}`}>
            Get Todo by ID
        </a>
        <h3>Filtering Array Items</h3>
        <a  className="btn btn-info m-2"  href={`${API}?completed=true`}>
            Get Completed Todos
        </a>

        <h3>Creating new Items in an Array</h3>
        <a className="btn btn-success m-2" href={`${API}/create`}>
            Create Todo
        </a>

        <h3>Deleting from an Array</h3>
        <a className="btn btn-danger m-2" href={`${API}/${todo.id}/delete`}>
            Delete Todo with ID = {todo.id}
        </a>
        

        <h3>Updating</h3>

        <h3>Updating an Item in an Array</h3>
         <input className="m-2" type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value })}/>
        <h5>Updating title in todo</h5>
        <a className="btn btn-warning m-2" href={`${API}/${todo.id}/title/${todo.title}`} >
            Update Title to {todo.title}
        </a>

        <br/>
        <textarea className="m-2" type="text" value={todo.description}
        onChange={(e) => setTodo({
          ...todo, description: e.target.value })}/>
         <h5>Updating description in Todo</h5>
         <a className="btn btn-warning m-2" href={`${API}/${todo.id}/description/${todo.description}`} >
            Update Description to {todo.description}
        </a>
        <br/>
        <label> <input className="m-2" type="checkbox" value={todo.completed}
        onChange={(e) => setTodo({
          ...todo, completed: !todo.completed })}/> Completed </label> 
        <h5>Updating Completed in Todo</h5>
        <a className="btn btn-warning m-2" href={`${API}/${todo.id}/completed/${todo.completed}`} >
            Update Completed to {todo.completed}
        </a>
        

      </div>
    );
  }
  export default WorkingWithArrays;