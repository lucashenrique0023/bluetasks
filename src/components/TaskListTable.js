import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import TaskService from '../api/TaskService';
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from 'react-router-dom';
import Alert from './Alert';
import AuthService from '../api/AuthService';
import Spinner from './Spinner';
import Moment from 'react-moment';

class TaskListTable extends Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: [],
            editId: 0,
            loading: false,
            alert: null
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
    }

    render() {
        if (!AuthService.isAuthenticated()){
            return <Redirect to="/login" />
        }

        if (this.state.editId !== 0){
            return <Redirect to={`form/${this.state.editId}`} />
        }

        return (
                <>
                    <h1>Lista de Tarefas</h1>
                    { this.state.alert != null ? <Alert message={this.state.alert} /> : "" }
                    { this.state.loading ?  <Spinner /> : 
                        <table className="table table-striped">
                            <TableHeader />
                            {this.state.tasks.length > 0 ?
                                <TableBody tasks={this.state.tasks} 
                                            onDelete={this.onDeleteHandler}
                                            onEdit={this.onEditHandler}
                                            onStatusChange={this.onStatusChange}
                                            />
                                :
                                <EmptyTableBody />
                            }
                            
                        </table>
                    }
                    <ToastContainer autoClose={1500} />
                    
                </>
        );
    }

    componentDidMount() {
        this.listTasks();
    }
 
    listTasks(){
        if (!AuthService.isAuthenticated){
            return;
        }

        this.setState({ loading: true });
        TaskService.list(
            tasks => this.setState({ tasks: tasks, loading: false }),
            error => this.setErrorState(error)
        )
    }

    setErrorState(error){
        this.setState({ alert: `Erro na requisicao: ${error.message}`, loading: false });
    }

    onDeleteHandler(id){
        if (window.confirm("Deseja mesmo remover essa tarefa?")){
            TaskService.delete(id);
            this.listTasks();
            toast.success("Tarefa removida!", { position: toast.POSITION.BOTTOM_LEFT })
        }
        
    }

    onEditHandler(id){
        this.setState({ editId: id})
    }

    onStatusChange(task){
        task.done = !task.done;
        TaskService.save(task);
        this.listTasks();
    }

}

const TableHeader = () => {
    return (
        <thead className="thead-dark">
            <tr>
                <th scope="col">Status</th>
                <th scope="col">Descricao</th>
                <th scope="col">Data</th>
                <th scope="col">Acoes</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    return (
        <tbody>
        {props.tasks.map(task => 
            <tr key={task.id}>
                <td>
                    <input type="checkbox"
                        checked={task.done}
                        onChange={(event) => props.onStatusChange(task)}
                        />
                </td>
                <td>{task.done ? <s>{task.description}</s> : task.description}</td>
                <td>{task.done ? 
                                <s><Moment format="DD/MM/YYYY">{task.whenToDo}</Moment></s> 
                                : <Moment format="DD/MM/YYYY">{task.whenToDo}</Moment>}
                </td>
                <td>
                    <input type="button" 
                            className="btn btn-primary"
                            value="Editar"
                            onClick={() => props.onEdit(task.id)}
                            />
                    &nbsp;
                    <input type="button" 
                            className="btn btn-danger" 
                            value="Excluir"
                            onClick={() => props.onDelete(task.id)}
                            />
                </td>
            </tr>
        )}
        </tbody>
    )
}

const EmptyTableBody = (props) => {
    return (
        <tbody>
            <tr><td colSpan="4">Sem tarefas cadastradas no momento!</td></tr>
        </tbody>

    )
}

export default TaskListTable;