import { IDay, IPart } from '../internalTypes';

interface IGameOptions {
  redMax: number, 
  greenMax: number, 
  blueMax: number
}

const checkGameLegality = (rounds: Array<string> , options: IGameOptions) => {

  const trimmedRounds = rounds.map(round => {
    return round.replaceAll(/\s+/g, '');
  });

  for (const round of trimmedRounds ){
    const colors = round.split(',');
    for(const color of colors ) {
      const quantity:string = color.match(/\d+/)![0];
      const colorCode = color[quantity.length];

      switch (colorCode) {
      case 'r':
        if(Number(quantity) > options.redMax) return false;
        break;
        
      case 'g':
        if(Number(quantity) > options.greenMax) return false;
        break;

      case 'b':
        if(Number(quantity) > options.blueMax) return false;
        break;
    
      }
    }
  }
  return true;
};

const extractGames = (input: string) => {
  return input.split('\n').map((game, index)=> {
    const colonIndex = game.indexOf(':');
    const gameText =  game.substring(colonIndex+1);
    const rounds = gameText.split(';').map(round=>round.replaceAll(/\s+/g, ''));
    return rounds;
  });
};
const part1: IPart = (input) => {
  const redMax = 12;
  const greenMax = 13; 
  const blueMax = 14;

  let gameSum = 0;

  input.split('\n').map((game, index)=> {
    const colonIndex = game.indexOf(':');
    const gameText =  game.substring(colonIndex+1);
    const rounds = gameText.split(';');
    if(checkGameLegality(rounds, {redMax, greenMax, blueMax})) {
      gameSum += (index+1);
    }
  });


  return gameSum;
};

const part2: IPart = (input) => {
  const games = extractGames(input);

  let score = 0;
  
  for (const game of games) {
    let highestR = 0;
    let highestG = 0;
    let highestB = 0;

    for (const round of game ){
      const colors = round.split(',');
      for(const color of colors ) {
        const quantity:string = color.match(/\d+/)![0];
        const colorCode = color[quantity.length];
  
        switch (colorCode) {
        case 'r':
          if(Number(quantity) > highestR) highestR = Number(quantity);
          break;
          
        case 'g':
          if(Number(quantity) > highestG) highestG = Number(quantity);
          
          break;
  
        case 'b':
          if(Number(quantity) > highestB) highestB = Number(quantity);

          break;
      
        }
      }
    }

    score += (highestR * highestG * highestB);
    
  }

  return score;
};

export const Day: IDay = {
  part1,
  part2
};

