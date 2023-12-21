import assert from 'assert';

import { Day } from '../src/days/day8';
import { parseInput } from '../src/utils/inputParsing';

const input2 = 
`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

describe('Day 8', ()=>{
  it('should run part 1 example 1', ()=>{
    const input = 'RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)';

    assert.equal(Day.part1( parseInput(input)), 2);
  });

  it('should run part 1 example 2', ()=>{
    const input = 'LLR\n\nAAA = (BBB, BBB)\nBBB = (AAA, ZZZ)\nZZZ = (ZZZ, ZZZ)';

    assert.equal(Day.part1(parseInput(input)), 6);
  });


  it('should run part 2', ()=>{
    assert.equal(Day.part2(parseInput(input2)),6);
  });
});