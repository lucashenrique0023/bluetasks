class TaskService {
    constructor() {
        this.tasks = [
            { id: 1, description: "Tarefa 1", WhenToDo: "01/01/2030", done: false },
            { id: 2, description: "Tarefa 2", WhenToDo: "02/01/2030", done: true },
            { id: 3, description: "Tarefa 3", WhenToDo: "03/01/2030", done: false }
        ]
    }

    list() {
        return this.tasks;
    }
}

export default new TaskService();