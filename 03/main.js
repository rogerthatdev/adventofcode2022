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
    .then(data => {
        const dataArray = data.split('\n');
 
        const dataArraySplit = dataArray.map(x => {
            const firstHalf = x.substring(0, x.length / 2);
            const secondHalf = x.substring(x.length / 2);
            return [firstHalf, secondHalf];
        })

        const findCommonCharacters = (string1, string2) => {
            const set1 = new Set(string1);
            const set2 = new Set(string2);
            const commonCharacters = [...set1].filter(char => set2.has(char)).join('');
            return commonCharacters;
        };

        const commonItems = dataArraySplit.map(x =>{
            return findCommonCharacters(x[0], x[1]);
        })

        const upperCaseLetters = Array.from({length:26}, (_, i) => String.fromCharCode(i+65));        
        const lowerCaseLetters = Array.from({length:26}, (_, i) => String.fromCharCode(i+97));
 
        const getScore = x => {
            if (!x) return 0;
            if (x == x.toUpperCase()){
                return upperCaseLetters.indexOf(x)+27;
            } else if (x == x.toLowerCase()){
                return lowerCaseLetters.indexOf(x)+1;
            }
        }
        console.log(commonItems)

        const scoreArray = commonItems.map(x => {
            return getScore(x);
        })
        console.log(scoreArray)

        console.log(scoreArray.reduce((a,b) => a+b, 0))
    })
    .catch((err) => {
        console.error(err);
    });
