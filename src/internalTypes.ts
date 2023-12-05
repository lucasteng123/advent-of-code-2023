export type IPart = (input: string) => string | number | Promise<string | number>

export type IDay =  {
  part1: IPart
  part2: IPart
}