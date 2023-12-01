import assert from 'assert';

import { Day } from '../src/days/day1';

const exampleInputPart1 = 
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const exampleInputPart2 = 
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe('Day 1', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(exampleInputPart1), 142);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(exampleInputPart2), 281);
  });
});