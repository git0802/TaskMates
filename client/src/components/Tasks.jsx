import React, { useState, useEffect } from "react";
import "./Tasks.css"
import { Link } from 'react-router-dom';


function Tasks({selectedUserId, handleUserSelect, users}) {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("");

    useEffect(() => {
      getTasks()
    }, []);

    const handleChange = (event) => {
      setInput(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(category)
      addTask();
    };

    const handleOpen = (event) => {
      event.preventDefault();
      setOpen(!open);
    };

    const handleDelete = async (taskId) => {
      try{
        const results = await fetch(`/api/tasks/${taskId}`, {
          method: "DELETE",
        });
        const data = await results.json();
        getTasks();
        // setTasks(data)
      } catch (error) {
        console.log(error)
      }
    };

    const getTasks = async () => {
      try{
        const results = await fetch(`/api/tasks`, {
        method: "GET",
        });
        const data = await results.json();
        console.log(data)
        setTasks(data)
      } catch (error) {
        console.log(error)
      };      
    };

    const addTask = async () => {
      try {
        const newTask = { description:input, id_user:selectedUserId , category:category};
        const results = await fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        const data = await results.json();
        getTasks();
        setInput("") //clear the input field
      } catch (error) {
        console.log(error)
      }
    };


  return (
  <>
  <div className="mb-3 text-center">
    <div className="grid">
      <div className="row">
      <div className="col">

</div>
      <div className="col">
    <form onSubmit={handleSubmit}>
      <h2>All tasks</h2>
      
      <div className="dropdown">
        <button
          onClick={handleOpen}
          className="btn btn-light dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select user
        </button>
        {open && (
          <div>
            {users.map((user) => (
              <div key={user.id} onClick={() => handleUserSelect(user.id)}>
                <button type="button" 
                className="btn active" data-bs-toggle="button" aria-pressed="true" >
                {user.name}</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="input-text">
        <input onChange={handleChange} value={input} />
      </div>
      <select
        id="category"
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
        }}
        className="form-select btn-lg"
        aria-label="Default select example"
      >
        <option value="category">Category</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Buying">Buying</option>
        <option value="URGENT">Urgent</option>
      </select>
      <button className="btn btn-outline-dark" type="submit">
        Add task
      </button>
    </form>
    
    {tasks
    .map((task) => {
       const userAssociatedWithTask = users.find((user) => user.id === task.id_user);
       return (
        <div key={task.id}>
          <Link to={`/users/${task.id_user}`}>
            {userAssociatedWithTask ? userAssociatedWithTask.name : "User Not Found"}
          </Link>
          <ul>{task.description}</ul>
          <p className="category">Category: {task.category}</p>
          <button
            className="delete-btn btn-outline-dark"
            onClick={() => handleDelete(task.id)}
          >
            Delete task
          </button>
        </div>
        
      );
    })}
    </div>
        <div className="col">

    </div>
  
  </div>
  </div>
  </div>
</>
);
};

export default Tasks;


