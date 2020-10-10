import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Alert from './Alert';
import { AuthContext } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';

const TaskForm = (props) => {

    const auth = useContext(AuthContext);
    const tasks = useTasks();
    const [ task, setTask ] = useState({id: 0, description: "", whenToDo: ""});
    const [ redirect, setRedirect ] = useState(false)

    useEffect(() => {
        const editId = props.match.params.id;

        if (editId && auth.credentials.username !== null){
            tasks.load(~~editId);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ auth.credentials ]);

    useEffect(() => {
        if (tasks.taskLoaded) {
            setTask(tasks.taskLoaded);
            tasks.clearTaskLoaded();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks.taskLoaded])

    const onSubmitHandler = (event) => {
        event.preventDefault(); // Previne o refresh da tela
        tasks.save(task);
    }

    const onInputChangeHandler = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        setTask({ ...task, [field]: value});
    }

        if (!auth.isAuthenticated()){
            return <Redirect to="/login" />
        }

        if (redirect || tasks.taskUpdated){
            return <Redirect to="/" />
        }

        return (
            <div>
                <h1>Cadastro da Tarefa</h1>
                { tasks.error && <Alert message={tasks.error} /> }
                <form onSubmit={onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="description">Descricao</label>
                        <input type="text" 
                                className="form-control" 
                                name="description" 
                                placeholder="Digite a descricao"
                                value={task.description}
                                onChange={onInputChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="whenToDo">Data</label>
                        <input type="date" 
                                className="form-control" 
                                name="whenToDo" 
                                placeholder="Informe a data"
                                value={task.whenToDo}
                                onChange={onInputChangeHandler} />
                    </div>
                     <button type="submit" 
                            className="btn btn-primary"
                            disabled={tasks.processing}>
                            {tasks.processing ? 
                                <span className="spinner-border spinner-border-sm"
                                    role="status" aria-hidden="true">
                                </span>
                                : 
                                task.id === 0 ? "Gravar" : "Alterar"
                            }
                    </button>
                    &nbsp; &nbsp;
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => setRedirect(true)}>
                            Cancelar
                    </button>
                </form>
            </div>
        );
}

export default TaskForm;