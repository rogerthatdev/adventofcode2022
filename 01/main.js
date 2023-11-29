const fs = require('fs');
const util = require('util');

const filePath = './input.txt';
const readFile = util.promisify(fs.readFile);

async function main() {
    try {
        return await readFile(filePath, 'utf8');

    } catch (err) {
        console.error(err);
    }
}
main().then(data => {
    const elfArray = data.split('\n\n').map(elf => elf.split('\n'));
    const calorieArray = elfArray.map(elf => elf.reduce((x, y) => Number(x) + Number(y)));
    // Most calories
    console.log(calorieArray.reduce((max, current) => Math.max(max, current)), -Infinity);
    // Total of top 3
    console.log(calorieArray.sort((a, b) => b - a).slice(0, 3).reduce((x, y) => Number(x) + Number(y)));
});
