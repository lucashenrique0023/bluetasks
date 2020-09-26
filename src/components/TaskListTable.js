import React, { Component } from 'react';
import TaskService from '../api/TaskService';

class TaskListTable extends Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: []
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this)
    }

    render() {
        return (
                <table className="table table-striped">
                    <TableHeader />
                    <TableBody tasks={this.state.tasks} onDelete={this.onDeleteHandler}/>
                </table>
        );
    }

    componentDidMount() {
        this.listTasks();
    }
 
    listTasks(){
        this.setState({ tasks: TaskService.list() })
    }

    onDeleteHandler(id){
        TaskService.delete(id);
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
                <td><input type="checkbox" checked={task.done}/></td>
                <td>{task.description}</td>
                <td>{task.WhenToDo}</td>
                <td>
                    <input type="button" className="btn btn-primary" value="Editar"/>
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

export default TaskListTable;