import assert from 'assert';

import { Day } from '../src/days/day3';

const input = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;





describe('Day 3', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(input), 4361);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(input), 467835);
  });
}); 