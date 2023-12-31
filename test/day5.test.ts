import assert from 'assert';

import { Day } from '../src/days/day5';
import { parseInput } from '../src/utils/inputParsing';

const inputText = 
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const input = parseInput(inputText);

describe('Day 5', ()=>{
  it('should run part 1', ()=>{
    assert.equal(Day.part1(input),35);
  });
  it('should run part 2', async ()=>{
    assert.equal(await Day.part2(input),46);
  });
});