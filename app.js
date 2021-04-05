require('colors');
const {
    inquirerMenu, 
    pause, 
    readInput, 
    deleteListMenu,
    confirmation,
    checklistMenu
} = require('./helpers/inquirer');
const { saveInfo, readDB } = require('./helpers/saveFiles');
const Tasks = require('./models/tasks');

const main = async () => {

    let opt = '';
    const tasks = new Tasks();
    const taskDB = readDB();

    if (taskDB) { 
        tasks.loadTaskFromArray(taskDB);
    }

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
                tasks.listCompleted()
            break;

            case '3': 
                // List completed 
                tasks.listPendingComplete(true);
            break;

            case '4': 
                // List pending
                tasks.listPendingComplete(false);
            break;
            
            case '5': 
                // Completed || Pending
                const ids = await checklistMenu(tasks.arrayList);
                tasks.toggleCompleted(ids)
            break;

            case '6': 
                // Delete
                const id =  await deleteListMenu(tasks.arrayList);

                if ( id !== '0' ) {
                    const confirm = await confirmation('¿Are you shure?');
    
                    if (confirm) {
                        tasks.deleteTask(id); 
                        console.log()
                        console.log('Task successfully deleted');
                    }
                }
            break;
        }

        saveInfo(tasks.arrayList);

        await pause();

    } while (opt !== '0')
};

main();