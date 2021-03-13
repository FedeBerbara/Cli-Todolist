const fs = require('fs');

const saveInfo = data => {

    const file = './db/data.json'

    fs.writeFileSync(file, JSON.stringify(data));
};

module.exports = {
    saveInfo,
}