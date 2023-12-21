import { IDay, IPart } from '../internalTypes';

type Card = {
  winningNumbers: Array<number>,
  score: number
}

const getCards = (lines: Array<string>): Array<Card> => {
  const cards: Array<Card> = lines.map(line=>{
    let score = 0;
    const [winningNumberString, cardNumberString] = line.split('|');
    const cardNumbers = cardNumberString.split(' ').filter(n=>n.length).map(n=>Number(n));
    const winningNumbers = winningNumberString.split(':')[1].split(' ').map(n=>Number(n)).filter(number=>{
      
      if(isNaN(number)) return false;
      
      if(cardNumbers.includes(number)){
        if(!score){
          score = 1;
        } else {
          score = score*2;
        }
        return true;
      }

      return false;
    });
    return {
      winningNumbers,
      score
    };
  });
  

  return cards;

};

const part1: IPart = (input) => {
  const lines = input.toLines();
  //split the card in half, remove the card index

  const cards = getCards(lines);
  const score = cards.reduce((acc: number, card: Card)=>acc+card.score,0);

  return score;
};

const part2: IPart = (input) => {
  const lines = input.toLines();
  const cards = getCards(lines);
  const cardCopies = Array<number>(cards.length).fill(1);
  
  for (let index = 0; index < cardCopies.length; index++) {
    const quantityOfCurrentCard = cardCopies[index];
    const copiesToApply = cards[index].winningNumbers.length;
    for (let x = 1; x < copiesToApply+1; x++) {
      cardCopies[x+index] += quantityOfCurrentCard;
    }
  }

  const totalCards = cardCopies.reduce((acc,val)=>acc+val, 0);
  return totalCards;
};

export const Day: IDay = {
  part1,
  part2
};

