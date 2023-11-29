// const fs = require('fs').promises;
import { promises as fs } from 'fs';

async function main() {
    try {
        const data = await fs.readFile('./input.txt', 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

main()
    .then((data) => {
        const scoreMap = x => {
            switch (x) {
                case 'X':
                    return 1;
                case 'Y':
                    return 2;
                case 'Z':
                    return 3;
                default:
                    return 0;
            }
        };

        const outcome = (opponentPlay, yourPlay) => {
            const translate = {X: 'rock', Y: 'paper', Z: 'scissors', A: 'rock', B: 'paper', C: 'scissors'};
            opponentPlay = translate[opponentPlay];
            yourPlay = translate[yourPlay];
            if (opponentPlay == yourPlay) {
                return 3;
            } else if (yourPlay == 'rock' && opponentPlay == 'scissors') {
                return 6;
            } else if (yourPlay =='paper' && opponentPlay == 'rock') {
                return 6;
            } else if (yourPlay =='scissors' && opponentPlay == 'paper') {
                return 6;
            } else {
                return 0;
            }
            
        };

        const totalScore = (x, y) => scoreMap(y) + outcome(x, y);
        const roundArray = data.split('\n').map(x => x.split(' '))
        
        const scoreArray = roundArray.map(x => totalScore(x[0], x[1]))
        console.log(roundArray)
        console.log(scoreArray)

        const total = scoreArray.reduce((a, b) => a + b, 0);
        console.log(total) // 10313 INCORRECT
    })
    .catch((err) => {
        console.error(err);
    });
