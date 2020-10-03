import Axios from 'axios';
import AuthService from '../api/AuthService';
import { API_ENDPOINT } from '../constants';

class TaskService {

    list(onFetch, onError) {
        Axios.get(`${API_ENDPOINT}/tasks?sort=whenToDo,asc`, this.buildAuthHeader())
            .then(response => onFetch(response.data.content))
            .catch(e => onError(e));

    }

    load(id, onLoad, onError){
        Axios.get(`${API_ENDPOINT}/tasks/${id}`, this.buildAuthHeader())
            .then(response => onLoad(response.data))
            .catch(e => onError(e));
    }

    delete(id, onDelete, onError){
        Axios.delete(`${API_ENDPOINT}/tasks/${id}`, this.buildAuthHeader())
            .then(() => onDelete())
            .catch(e => onError(e));
    }

    save(task, onSave, onError){
        if (task.id === 0){
            Axios.post(`${API_ENDPOINT}/tasks`, task, this.buildAuthHeader())
                .then(() => onSave())
                .onError(e => onError(e));
        } else {
            Axios.put(`${API_ENDPOINT}/tasks/${task.id}`, task, this.buildAuthHeader())
                .then(() => onSave())
                .catch(e => onError(e));
        }
    }

    buildAuthHeader() {
        return {
            headers: {
                'Authorization': `Bearer ${AuthService.getJWTToken()}`
            }
        }
    }
}

export default new TaskService();