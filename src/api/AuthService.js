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

    logout() {
        sessionStorage.removeItem(JWT_TOKEN_NAME);
    }

    getJWTTokenData() {
        const jwtToken = this.getJWTToken();
        if (jwtToken == null){
            return null;
        }

        const jwtTokenData = atob(jwtToken.split(".")[1]);
        return JSON.parse(jwtTokenData);
    }

    getJWTToken(){
        let a = sessionStorage.getItem(JWT_TOKEN_NAME);
        return a;
    }

    isAuthenticated(){
        let a = this.getJWTToken() != null;
        return a;
    }

}

export default new AuthService();