import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            task : {
                id: 0,
                description: "",
                whenToDo: ""
            }
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    onSubmitHandler(event){
        event.preventDefault(); // Previne o refresh da tela
    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;
        
        this.setState(prevState => ({ task: {...prevState.task, [field]: value } }))
    }

    render() {
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
                                onChange={this.onInputChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="whenToDo">Data</label>
                        <input type="date" 
                                className="form-control" 
                                name="whenToDo" 
                                placeholder="Informe a data"
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