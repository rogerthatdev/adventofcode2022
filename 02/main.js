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
                case 'rock':
                    return 1;
                case 'paper':
                    return 2;
                case 'scissors':
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
        const total = scoreArray.reduce((a, b) => a + b, 0);

        console.log(total) // 10310
        
        const convert = x => {
            switch (x) {
                case 'A':
                    return 'rock';
                case 'B':
                    return 'paper';
                case 'C':
                    return 'scissors';
                default:
                    return null;
            }
        };

        const outcomeMap = x => {
            switch (x) {
                case 'X':
                    return 0;
                case 'Y':
                    return 3;
                case 'Z':
                    return 6;
                default:
                    return 0;
            
        }};

        const whatToPlay = (opponent, outcome) => {
            if (outcome == 'Y'){
                return opponent;
            }
            else if (opponent == 'rock' && outcome == 'X') {
                return 'scissors';
            } else if (opponent == 'rock' && outcome == 'Z') {
                return 'paper';
            } else if (opponent == 'paper' && outcome == 'X') {
                return 'rock';
            } else if (opponent == 'paper' && outcome == 'Z') {
                return 'scissors';
            } else if (opponent == 'scissors' && outcome == 'X') {
                return 'paper';
            } else if (opponent == 'scissors' && outcome == 'Z') {
                return 'rock';
            }
       }

       const pt2TotalScore = (x, y) => {
            return outcomeMap(y) + scoreMap(whatToPlay(convert(x), y))
       };
       
       const pt2RoundArray = data.split('\n').map(x => x.split(' '))
       console.log(pt2RoundArray)
       const pt2ScoreArray = pt2RoundArray.map(x => pt2TotalScore(x[0], x[1]))
       const pt2Total = pt2ScoreArray.reduce((a, b) => a + b, 0);

       console.log(pt2Total) // 
})
    .catch((err) => {
        console.error(err);
    });
