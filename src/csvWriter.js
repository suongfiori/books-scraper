const { Parser } = require('json2csv');
const fsPromises = require('fs').promises;

async function writeCsv(genre, data) {
    try {
        const parser = new Parser();
        const csv = parser.parse(data);
        await fsPromises.writeFile(`./${genre}-books-data.csv`, csv);
        console.log(`${genre}-books-data.csv has been written.`);
    } catch (error) {
        console.error('Error writing CSV:', error);
    }
}

module.exports = { writeCsv };

