import React, { useState, useEffect } from "react";
import "./App.css";
import Tasks from "./pages/Tasks";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import Bills from "./pages/Bills";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    lastname: "",
    adress: "",
    description: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true);
    navigate("/home");
  };

  const handleRegisterSuccess = (email) => {
    navigate("/login");
  };

  const getUsers = () => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (open) {
      getUsers();
    }
  }, [open]);
  //execute function when the value of 'open' changes
  //The array [open] is provided as the second argument,
  //which means that the effect will run whenever the
  //'open' state changes.

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId); //update selected userId
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Additional actions for logout, e.g., clearing user data or redirecting to the login page.
  };

  return (
    <>
      <div className="App">
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <div>
              <i className="glyphicon glyphicon-home"></i>
              <Link to="/home" className="link-dark">
                Home
              </Link>
            </div>
            <div>
              <i className="glyphicon glyphicon-tasks"></i>
              <Link to="/tasks" className="link-dark">
                Tasks
              </Link>
            </div>
            <div>
              <i className="glyphicon glyphicon-eur"></i>
              <Link to="/Bills" className="link-dark">
                Bills
              </Link>
            </div>
            <div>
              <i className="glyphicon glyphicon-home"></i>
              <Link to="/login" className="link-dark">
                Login
              </Link>
            </div>
            <div>
              <i className="glyphicon glyphicon-home"></i>
              <Link to="/register" className="link-dark">
                Register
              </Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route
            path="/tasks"
            element={
              isLoggedIn ? (
                <Tasks
                  selectedUserId={selectedUserId}
                  handleUserSelect={handleUserSelect}
                  users={users}
                />
              ) : (
                <Navigate to="/tasks" />
              )
            }
          />
          <Route
            path="/users/:id"
            element={
              isLoggedIn ? (
                <UserProfile selectedUserId={selectedUserId} />
              ) : (
                <Navigate to="/users/:id" />
              )
            }
          >
            <Route
              path="/users/:id/tasks"
              element={
                <Tasks
                  selectedUserId={selectedUserId}
                  handleUserSelect={handleUserSelect}
                  users={users}
                />
              }
            />
          </Route>
          <Route
            path="/bills"
            element={
              isLoggedIn ? <Bills users={users} /> : <Navigate to="/bills" />
            }
          />
          {/* <Route path="*" element={<404 />} />*/}
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/register"
            element={<Register onRegisterSuccess={handleRegisterSuccess} />}
          />
        </Routes>
      </div>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      <Outlet />
    </>
  );
}

export default App;
