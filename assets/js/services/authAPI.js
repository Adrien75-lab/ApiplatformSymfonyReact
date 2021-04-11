import axios from "axios";
import jwtDecode from "jwt-decode";


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
        window.localStorage.setItem("authToken", token);
        // On prévient axios qu'on a maintenant un header par défaut sur toutes nos futurs requetes HTTP
        setAxiosToken(token);
        
    });
    
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;

}
function setup(){
    //1 Voir si on a un token ? 
    const token = window.localStorage.getItem("authToken");

    //2 Voir si il est toujours valide
    if (token) {
        const {exp: expiration} = jwtDecode(token);

        if(expiration * 1000, new Date().getTime()) {
                setAxiosToken(token);
                } 
            } 
        }

    function isAuthenticated() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            const {exp: expiration} = jwtDecode(token);

        if(expiration * 1000, new Date().getTime()) {
            return true;
            }
            return false;
        }
       return false;
    }
export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};