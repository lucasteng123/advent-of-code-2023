import { parentPort, workerData } from 'worker_threads';

import type {SeedRange, Translation} from './day5';
import { translateSeed } from './day5';

const {seedRange, translations}: {
  seedRange: SeedRange,
  translations: Array<Array<Translation>>
} = workerData;


let smallest = Infinity;

for(let seed=seedRange.start; seed<seedRange.end; seed++){
  let buffer = seed;
  if(seed % 10000 == 0){
    parentPort?.postMessage({
      status: 'working',
      currentSeed: seed
    });
  }
  for(const group of translations){
    buffer = translateSeed(buffer, group).transformedSeed;
  }
  if(buffer < smallest) smallest = buffer;
}
parentPort?.postMessage({status:'done', value:smallest});
