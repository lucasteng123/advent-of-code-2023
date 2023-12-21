import { IDay, IPart } from '../internalTypes';
import { Worker } from 'worker_threads';
import CLIProgress from 'cli-progress';

export type Translation = {
  sourceStart: number,
  sourceEnd: number,
  destinationStart: number,
  destinationEnd: number,
  mutation: number,
  range: number
}

export type SeedRange = {
  start: number,
  end: number
}

/*
Lines:
x-to-y map:
dst src rng
dst src rng
dst src rng < Numbers
*/

const parseTranslations = (lines: Array<string>): Array<Array<Translation>> =>{
  const translations: Array<Array<Translation>> = [];

  for(const line of lines){
    const translationLines = line.split('\n');
    translationLines.shift();
    const translation: Array<Translation> =  translationLines.map(t=>{
      const [destinationStart, sourceStart, range] = t.split(' ').map(n=>Number(n));
      const mutation = destinationStart - sourceStart;
      return {
        sourceStart,
        sourceEnd: sourceStart + range-1,
        destinationStart,
        destinationEnd: destinationStart+range-1, 
        mutation,
        range
      };
    });

    translations.push(translation);
  }
  
  return translations;
};

export const translateSeed = 
  (seed: number, translations: Array<Translation>): 
  {transformedSeed: number,
  nextSeedToCheck: number} => {

    for(const translation of translations){
      if(seed >= translation.sourceStart && seed <= translation.sourceEnd){
        return {
          transformedSeed: seed + translation.mutation,
          nextSeedToCheck: translation.sourceEnd+1
        };
      }
    }
    return {
      transformedSeed: seed,
      nextSeedToCheck: seed+1
    };

  };

const part1: IPart = (input) => {
  const [seedLine, ...transformationLines] = input.toLines('\n\n');
  const seeds = seedLine.split(':')[1].trim().split(' ').map(n=>Number(n));

  const translations = parseTranslations(transformationLines);

  const locations = seeds.map(seed=>{
    let valueBuffer = seed;
    for(const group of translations) {
      valueBuffer = translateSeed(valueBuffer, group).transformedSeed;
    }
    return valueBuffer;
  });

  return Math.min(...locations);
};

const processSeedRange = (seedRange: SeedRange, translations: Array<Array<Translation>>, progressBar?:CLIProgress.SingleBar): Promise<number>=>{
  return new Promise(res=>{
    const worker = new Worker('./build/src/days/day5Worker.js', {
      workerData: {
        seedRange, translations
      }
    });
    worker.on('error',(err)=>console.log(err));
    worker.on('message', (msg:{
      status:'working' | 'done',
      value?: number,
      currentSeed?: number,
    })=>{
      switch (msg.status) {
      case 'working':
        progressBar?.update(msg.currentSeed! - seedRange.start);
        break;
      
      case 'done':
        res(msg.value!);
        break;
      }
    });

  });
};

const part2: IPart = async (input) => {
  const [seedLine, ...translationLines] = input.toLines('\n\n');

  const seedNumbers = seedLine.split(':')[1].trim().split(' ');

  const seedRanges: Array<SeedRange> = [];

  const translations = parseTranslations(translationLines);
  
  for (let i = 0; i < seedNumbers.length; i+=2) {
    seedRanges.push({
      start: Number(seedNumbers[i]),
      end: Number(seedNumbers[i]) + Number(seedNumbers[i+1])
    });
  }
  const progressGroup = new CLIProgress.MultiBar({
    clearOnComplete: true,
    hideCursor:true,
    format:'{bar} | {eta} | {value}/{total}'
  });
  const lowestValues = await Promise.all(seedRanges.map(sr=>{
    const bar = progressGroup.create(sr.end-sr.start,0);
    return processSeedRange(sr, translations, bar);
  }));
  progressGroup.stop();


  return Math.min(...lowestValues);
};

export const Day: IDay = {
  part1,
  part2
};

