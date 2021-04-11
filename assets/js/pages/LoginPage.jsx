import React, {useState} from 'react';
import AuthAPI from '../services/authAPI';

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
      });
      const [error, setError] = useState("");
    
      // Gestion des champs
      const handleChange = ({ currentTarget }) => {
        const {value, name } = currentTarget;
        setCredentials({ ...credentials, [name]: value });
      };
// Gestion du Submit
const handleSubmit = async event => {
    event.preventDefault();
    try {
        await AuthAPI.authenticate(credentials);
        setError("");

    } catch ( error ){
        
        setError("Aucun compte ne possède cette adresse email ou les informations ne correspondent pas");
    }
   
    
};
    return ( <>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Adresse email</label>
                <input 
                value={credentials.username}
                onChange={handleChange}
                type="email" 
                placeholder="Adresse email de connexion" 
                name="username" 
                id="username" 
                className={"form-control" + (error && " is-invalid" )}
                />
                {error && <p className="invalid-feedback">{error}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de Passe</label>
                <input 
                value={credentials.password}
                onChange={handleChange}
                type="password" 
                placeholder="Mot de passe" 
                name="password" 
                id="password" 
                className="form-control"/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success">Je me connecte
            </button>
            </div>
        </form>
    </>
    );
}

export default LoginPage;
