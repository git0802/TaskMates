import React from "react";
import { Link } from 'react-router-dom';
import "./Home.css";

function Home() {
    return (
        <div>
            <hr/>
            <h2>Welcome to</h2>
            <h4>Carrer de Provença 397</h4>
            <hr/>
            <img className="img-fluid" src="https://www.bourgeoisfincas.com/wp-content/uploads/2021/05/Sin-titulo-3.jpg" alt="balconies" />
        </div>
    );
}

export default Home;
