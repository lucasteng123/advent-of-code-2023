import assert from 'assert';

import { Day } from '../src/days/day7';
import { parseInput } from '../src/utils/inputParsing';

const inputText = 
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
JJJJJ 0`;

const input = parseInput(inputText);

describe('Day 7', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(input), 6440);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(input),5905);
  });
});