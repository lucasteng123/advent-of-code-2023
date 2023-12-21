import { AOCInput } from './utils/inputParsing';

export type IPart = (input: AOCInput) => string | number | Promise<string | number>

export type IDay =  {
  part1: IPart
  part2: IPart
}