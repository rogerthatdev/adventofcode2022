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
    const calorieArray = elfArray.map(elf => elf.reduce((x,y) => Number(x)+Number(y)));
    console.log(calorieArray.reduce((max, current)=> Math.max(max, current)), -Infinity);
});
