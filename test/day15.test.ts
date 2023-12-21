import assert from 'assert';

import { Day } from '../src/days/day15';
import { parseInput } from '../src/utils/inputParsing';

const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7';

describe.only('Day 15', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(parseInput(input)),1320);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(parseInput(input)),145);
  });
});