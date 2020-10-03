import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../api/AuthService';
import TaskService from '../api/TaskService';
import Alert from './Alert';
import Spinner from './Spinner';

class TaskForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            task : {
                id: 0,
                description: "",
                whenToDo: ""
            },
            redirect: false,
            buttonName: "Cadastrar",
            alert: null,
            loading: false
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    onSubmitHandler(event){
        event.preventDefault(); // Previne o refresh da tela
        TaskService.save(this.state.task);
        this.setState({ redirect: true });
    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;
        
        this.setState(prevState => ({ task: {...prevState.task, [field]: value } }))
    }

    componentDidMount(){
        const taskId = this.props.match.params.id;
        if (taskId) {
            this.setState({ loading: true });
            TaskService.load(~~taskId,
                task => {
                    this.setState({ task : task, buttonName: "Alterar", loading: false })
                }
                ,
                error => {
                    if (error.response){
                        this.setState({ alert: `Erro ao carregar dados.`, loading: false })
                    } else {
                        this.setState({ alert: `Erro na requisicao: ${error.message}`, loading: false})
                    }
            });
        }
    }

    render() {
        if (!AuthService.isAuthenticated()){
            return <Redirect to="/login" />
        }

        if (this.state.redirect){
            return <Redirect to="/" />
        }

        if(this.state.loading){
            return <Spinner />
        }

        return (
            <div>
                <h1>Cadastro da Tarefa</h1>
                { this.state.alert != null ? <Alert message={this.state.alert} />: "" }
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="description">Descricao</label>
                        <input type="text" 
                                className="form-control" 
                                name="description" 
                                placeholder="Digite a descricao"
                                value={this.state.task.description}
                                onChange={this.onInputChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="whenToDo">Data</label>
                        <input type="date" 
                                className="form-control" 
                                name="whenToDo" 
                                placeholder="Informe a data"
                                value={this.state.task.whenToDo}
                                onChange={this.onInputChangeHandler} />
                    </div>
                     <button type="submit" className="btn btn-primary">{this.state.buttonName}</button>
                    &nbsp; &nbsp;
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => this.setState({ redirect: true })}>
                            Cancelar
                    </button>
                </form>
            </div>
        );
    }
}

export default TaskForm;