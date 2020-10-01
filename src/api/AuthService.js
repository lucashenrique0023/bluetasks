import Axios from "axios";
import { AUTH_ENDPOINT, JWT_TOKEN_NAME } from "../constants.js"

class AuthService {

    login(username, password, onLogin) {
        Axios
            .post(`${AUTH_ENDPOINT}/login`, { username: username, password: password })
            .then(response => {
                const jwtToken = response.headers['authorization'].replace("Bearer ", "");
                sessionStorage.setItem(JWT_TOKEN_NAME, jwtToken);
                onLogin(true);
            }).catch(error => {
                console.error(error);
                onLogin(false);
            });
            
    }
}

export default new AuthService();