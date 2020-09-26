class TaskService {
    constructor() {
        this.tasks = [
            { id: 1, description: "Tarefa 2", WhenToDo: "01/01/2030", done: false },
            { id: 1, description: "Tarefa 2", WhenToDo: "01/01/2030", done: false },
            { id: 1, description: "Tarefa 2", WhenToDo: "01/01/2030", done: false }
        ]
    }

    list() {
        return this.tasks;
    }
}

export default new TaskService();