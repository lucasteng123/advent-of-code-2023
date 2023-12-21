import { IDay, IPart } from '../internalTypes';
import { sortDesc } from '../utils';



type Hand = {
  cards: {[c:number]: number},
  rank: Array<number>
  bet: number
}

const parseHand = (line: string, hasJokers: boolean): Hand => {
  const [hand, bet] = line.split(' ');


  const strength = hasJokers ? 'J23456789TQKA' : '23456789TJQKA';


  let cardFrequencies: {[c:number]: number} = {};
  const cards = hand.trim().split('').map(chr=>strength.indexOf(chr));
  
  cards.forEach(card => {
    if(!(card in cardFrequencies)){
      cardFrequencies = {...cardFrequencies, [card]:1};
    } else {
      cardFrequencies[card] = cardFrequencies[card]+1;
    }
  });

  let jokers: number = 0;
  if(hasJokers){
    jokers = cardFrequencies['0'];
    delete cardFrequencies['0'];
  }

  const rank = Object.values(cardFrequencies).sort(sortDesc);

  if(hasJokers && jokers){
    rank[0] ??= 0;
    rank[0] += jokers;
  }
  
  return {
    cards: cardFrequencies,
    rank: [...rank, ...cards],
    bet: Number(bet)
  };

};

const sorter = (a: Hand,b: Hand): number=>{
  for (let i = 0; i < a.rank.length; i++) {
    if(a.rank[i]>b.rank[i]) return 1;
    if(a.rank[i]<b.rank[i]) return -1;
  }
  return 0;
};


const part1: IPart = (input) => {
  const handLines = input.toLines('\n');
  const hands = handLines.map(line=>parseHand(line, false));
  hands.sort(sorter);

  return hands.reduce((acc:number, hand:Hand, index: number)=>acc+(hand.bet*(index+1)),0) ;
};

const part2: IPart = (input) => {

  const handLines = input.toLines('\n');
  const hands = handLines.map(line=>parseHand(line, true));
  hands.sort(sorter);

  return hands.reduce((acc:number, hand:Hand, index: number)=>acc+(hand.bet*(index+1)),0) ;

};

export const Day: IDay = {
  part1,
  part2
};

