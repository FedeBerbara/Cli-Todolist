const {v4: uuidv4} = require('uuid');

class Task {
    id = '';
    description = '';
    completeAt = null;

    constructor( description ) {
        this.id = uuidv4();
        this.description = description;
        this.completeAt = null;
    };
}

module.exports = Task;