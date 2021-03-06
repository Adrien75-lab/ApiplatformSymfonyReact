import React from 'react';
import AuthAPI from "../services/authAPI";
import { NavLink } from "react-router-dom";

const Navbar = ({isAuthenticated, onLogout }) => {

    const handleLogout = () => {
      AuthAPI.logout();
      onLogout(false);

    }
    return(<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <NavLink className="navbar-brand" to="/">Symreact</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        
        <li className="nav-item">
          <NavLink className="nav-link" to="/customers">Clients</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/invoices">Factures</NavLink>
        </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {(!isAuthenticated && (<>
            <li className="nav-item">
                <NavLink to="/register" className="nav-link">Inscription</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
            </li>
            </>
           )) || (
           
            <li className="nav-item">
                <button onClick={handleLogout} className="#" className="btn btn-danger">Déconnexion</button>
            </li>
           )}
        </ul>
    </div>
  </nav>);
}

export default Navbar;