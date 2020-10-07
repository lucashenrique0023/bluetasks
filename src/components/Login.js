import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Alert from './Alert'
import { AuthContext } from '../hooks/useAuth'

const Login = () => {

    const auth = useContext(AuthContext);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const submitHandle = (event) => {
        event.preventDefault();
        auth.login(username, password)
    }

    if (auth.isAuthenticated()){
        return <Redirect to="/" />
    }

    return (
        <div>
            <h1>Login</h1>
            {auth.error && <Alert message={auth.error} />}
            <form onSubmit={submitHandle}>
                <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input type="text" 
                        className="form-control" 
                        onChange={(event) => setUsername(event.target.value)} 
                        value={username}
                        placeholder="Digite o usuario"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" 
                        className="form-control" 
                        onChange={(event) => setPassword(event.target.value)} 
                        value={password}
                        placeholder="Digite a senha"/>
                </div>
                <button type="submit"
                    className="btn btn-primary"
                    disabled={auth.processing}>
                        Login
                </button>
            </form>
        </div>
    );
}

export default Login;