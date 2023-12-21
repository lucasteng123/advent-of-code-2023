import assert from 'assert';

import { Day } from '../src/days/day14';
import { parseInput } from '../src/utils/inputParsing';



const input = 
`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

//part 1 only has us moving these to the north, I guarantee we will have to move it in all 4 directions eventually


describe('Day 14', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(parseInput(input)),136);
  });
  it('should run part 2', ()=>{
    assert.equal(Day.part2(parseInput(input)),64);
  });
});