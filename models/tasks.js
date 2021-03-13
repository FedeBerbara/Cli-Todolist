const Task = require('./task');

class Tasks {
    _taskList = {};

    get arrayList() {

        const list = [];

        Object.keys(this._taskList).forEach(key => {
            const task = this._taskList[key]
            list.push(task)
        });

        return list;
    };

    constructor() {
        this._taskList = {}
    };

    createTask(description = '') {
        const task = new Task(description);
        this._taskList[task.id] = task
    }
}

module.exports = Tasks