import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TaskService from '../api/TaskService';

class TaskForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            task : {
                id: 0,
                description: "",
                whenToDo: ""
            },
            redirect: false
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
            const task = TaskService.load(~~taskId);
            this.setState({ task : task })
        }
    }

    render() {

        if (this.state.redirect){
            return <Redirect to="/" />
        }

        return (
            <div>
                <h1>Cadastro da Tarefa</h1>
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
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                    &nbsp; &nbsp;
                    <button type="submit" className="btn btn-primary">Cancelar</button>
                </form>
            </div>
        );
    }
}

export default TaskForm;