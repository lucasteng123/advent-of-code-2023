import { IDay, IPart } from '../internalTypes';

interface IGameMaximums {
  red: number, 
  green: number, 
  blue: number
}

interface IGameOptions {
  redMax: number,
  greenMax: number,
  blueMax: number
}

const getHighestColorsInGame = (game: Array<string>): IGameMaximums => {
  let red = 0;
  let green = 0;
  let blue = 0;
  for (const round of game) {
    const [score, color] = round.trim().split(' ');
    if(color === 'red' && Number(score) > red) red = Number(score);
    if(color === 'green' && Number(score) > green) green = Number(score);
    if(color === 'blue' && Number(score) > blue) blue = Number(score);
  }
  return {
    red,
    green, 
    blue
  };
};

const checkGameLegality = (highestValues: IGameMaximums , options: IGameOptions) => {
  return highestValues.red <= options.redMax && highestValues.green <= options.greenMax && highestValues.blue <= options.blueMax;
};

const extractGames = (input: string) => {
  return input.split('\n').map((game)=> {
    const gameText = game.split(':')[1];
    //rounds can be expressed as individual brick pulls, instead of the defined "round"
    const rounds = gameText.split(/[,;]/);
    return rounds;
  });
};


// PART 1 ========
const part1: IPart = (aocInput) => {
  const input = aocInput.string;

  const redMax = 12;
  const greenMax = 13; 
  const blueMax = 14;

  let gameSum = 0;

  extractGames(input).forEach((game,index)=>{
    if(checkGameLegality(getHighestColorsInGame(game), {redMax, greenMax, blueMax})) gameSum += (index+1);
  }); 
  return gameSum;
};

// PART 2 ========
const part2: IPart = (aocInput) => {
  const input = aocInput.string;

  let score = 0;

  for(const game of extractGames(input)){
    const maximum = getHighestColorsInGame(game);
    score+=(maximum.red*maximum.green*maximum.blue);
  }
  return score;
};



export const Day: IDay = {
  part1,
  part2
};

