import axios from "axios";

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

 
function authenticate(credentials){
    return axios
    .post("http://localhost:8000/api/login_check", credentials)
    .then(response => response.data.token)
    .then(token => {

        // Je stock mon token dans mon localstorage
        window.localStorage.setItem("authToken",token);
        // On prévient axios qu'on a maintenant un header par défaut sur toutes nos futurs requetes HTTP
        axios.defaults["Autorization"] = "Bearer " + token;
        return true;
    });
    

    
}

export default {
    authenticate
};