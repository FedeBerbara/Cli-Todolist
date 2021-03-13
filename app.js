require('colors');
const {
    inquirerMenu, 
    pause, 
    readInput, 
} = require('./helpers/inquirer');
const { saveInfo } = require('./helpers/saveFiles');
const Tasks = require('./models/tasks');

const main = async () => {

    let opt = '';
    const tasks = new Tasks();

    do {
        // This function print the menu in the console
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // Create a Task
                const taskData = await readInput('Description:');
                tasks.createTask(taskData)    
            break;

            case '2':
                // List all Tasks
                console.log(tasks.arrayList);
            break;

        }

        saveInfo(tasks.arrayList);

        await pause();

    } while (opt !== '0')
};

main();