import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../api/AuthService';
import Alert from './Alert';

class Login extends Component {

    constructor(props){
        super(props);

        this.state =  {
            username: "",
            password: "",
            alert: null,
            processing: false,
            loggedIn: false
        }

        this.submitHandle = this.submitHandle.bind(this);
        this.inputChangeHandle = this.inputChangeHandle.bind(this);
        this.loginResponseHandle = this.loginResponseHandle.bind(this);
    }

    submitHandle(event){
        event.preventDefault();
        this.setState({ processing: true });
        AuthService.login(this.state.username, this.state.password, this.loginResponseHandle);
    }

    loginResponseHandle(success){
        if (success){
            this.setState({ loggedIn: true });
            this.props.onLoginSuccess();
        } else {
            this.setState({ alert: "O Login Falhou!"})
        }

        this.setState({processing: false});
    }

    inputChangeHandle(event){
        const field = event.target.name;
        const value = event.target.value;
        this.setState({ [field]: value });
    }

    render() {
        if (AuthService.isAuthenticated()){
            return <Redirect to="/" />
        }

        if (this.state.loggedIn){
            return <Redirect to="/" />
        }

        return (
            <div>
                <h1>Login</h1>
                {this.state.alert !== null ? <Alert message={this.state.alert} />: ""}
                <form onSubmit={this.submitHandle}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input type="text" 
                            className="form-control" 
                            onChange={this.inputChangeHandle} 
                            value={this.state.username}
                            name="username"
                            placeholder="Digite o usuario"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" 
                            className="form-control" 
                            onChange={this.inputChangeHandle} 
                            value={this.state.password}
                            name="password"
                            placeholder="Digite a senha"/>
                    </div>
                    <button type="submit"
                        className="btn btn-primary"
                        disabled={this.state.processing}>
                            Login
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;