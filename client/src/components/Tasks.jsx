import React, { useState, useEffect } from "react";
import "./Tasks.css"
import { Routes, Route, Link} from 'react-router-dom';


function Tasks({selectedUserId}) {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [category, setCategory] = useState("");
    //   task : "",
    //   user: "",
    //   category: "",
    

    useEffect(() => {
      getTasks()
    }, []);

    // const handleChange = (event, prevInput) => {
    //   setInput({
    //     ...prevInput,
    //     [event.target.name]: event.target.value
    //   });
    // };

    const handleChange = (event) => {
      setInput(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(category)
      addTask();
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
      // console.log("selectedUserId:", selectedUserId); 
      // let options = {
      //   method: "GET",
      // };
        try{
            const results = await fetch(`/api/tasks`, {
              method: "GET",
            });
            const data = await results.json();
            console.log(data)
            setTasks(data)
          } catch (error) {
            console.log(error)
          }
    };

    // try{
    //   const results = await fetch(`/api/tasks/${selectedUserId}`, options);
    //   const data = await results.json();
    //   // console.log(data)
    //   setTasks(data)
    // } catch (error) {
    //   console.log(error)
    // }

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
          // setTasks([...tasks, data]);
          setInput("") //clear the input field
        } catch (error) {
          console.log(error)
        }
      };


      return (
        <>
          <div className="mb-3">
            <form onSubmit={handleSubmit}>
              <h2>All tasks</h2>
              <div className="input-text">
                <input onChange={handleChange} value={input} />
              </div>
              {/* <div className="input-text">
                <input onChange={handleChange} value={input} />
              </div> */}
              <select id="category" value= {category} onChange={event => {setCategory(event.target.value)}} className="form-select" aria-label="Default select example">
                <option selected>Category</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Buying">Buying</option>
                <option value="URGENT">URGENT</option>
              </select>
              <button className="btn btn-primary" type="submit">
                Add task
              </button>
            </form> 
            <div>
              {tasks
              //filter tasks by selectedUserId
              // .filter((task) => task.id_user === selectedUserId)
              // If selectedUserId is null, display all tasks
              // If selectedUserId is not null, filter tasks by selectedUserId
              // .filter((task) => selectedUserId === null || task.id_user === selectedUserId)
              .map((task) => (
                <div key={task.id}>
                  <ul>{task.description}</ul>
                  <p>Category: {task.category}</p>
                  <p>User ID: {task.id_user}</p>
                  <Link to={`/users/${task.id_user}`}>User Profile</Link>
                  <button className="btn btn-secondary" onClick={() => handleDelete(task.id)}>
                    Delete task
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }


export default Tasks;


