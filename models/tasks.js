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

    deleteTask (id = '') {

        if (this._taskList[id]) {
            delete this._taskList[id];
        }
    }

    loadTaskFromArray( tasks = [] ) {
        tasks.forEach(task => {
            this._taskList[task.id] = task;
        });
    }

    createTask(description = '') {
        const task = new Task(description);
        this._taskList[task.id] = task
    }

    listCompleted() {
        console.log();

        this.arrayList.forEach( (task, i) => {
            const idx = `${i + 1}`.green;
            const {description, completeAt} = task;
            const status = (completeAt) ? 'Completed'.green : 'Pending'.red;

            console.log(`${ idx } ${ description } : ${ status }`);
        });
    }

    listPendingComplete( complete = true ) {
        console.log();

        let counter = 0;
        this.arrayList.forEach(task => {
            const {description, completeAt} = task;
            const status = (completeAt) ? 'Completed'.green : 'Pending'.red;

            if (complete) {
                if (completeAt) {
                    counter += 1;
                    console.log(`${ (counter + '.').green } ${ description } : ${completeAt.green}`)
                }
            } else {
                if ( !completeAt ) {
                    counter += 1;
                    console.log(`${ (counter + '.').green} ${ description } : ${ status }`)
                }
            }
        });
    }

    toggleCompleted( ids = [] ) {

        ids.forEach( id => {
            const task = this._taskList[id];

            if ( !task.completeAt ) {
                task.completeAt = new Date().toISOString();
            }
        });

        this.arrayList.forEach( task => {
            if ( !ids.includes(task.id) ) {
                const task = this._taskList[task.id];
                task.completeAt = null;
            }
        });
    }
}

module.exports = Tasks