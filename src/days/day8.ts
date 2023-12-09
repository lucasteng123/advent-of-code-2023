import { IDay, IPart } from '../internalTypes';

type Direction = 'R' | 'L'

interface INode {
  leftNode: string
  rightNode: string
}

const parseNodes = (lines: Array<string>): {[node: string]: INode} => {
  const nodes: {[node:string]: INode} = {};
  lines.forEach(line => {
    const [key, node] = line.split(' = ');
    const [left, right] = node.matchAll(/[A-Z]{3}/g);
    nodes[key] = {
      leftNode:left[0],
      rightNode: right[0]
    };
  });
  return nodes;
};

const traverseMapNodes = (directions: Array<Direction>, nodes: {[node:string]:INode}, startingNode: string, endNode: string): number => {
  let currentNode = startingNode;
  let steps = 0;
  while (currentNode !== endNode) {
    if(directions[steps%directions.length] === 'L' ) currentNode = nodes[currentNode].leftNode;
    else currentNode = nodes[currentNode].rightNode;
    steps++;
  }
  return steps;
};

const part1: IPart = (input) => {
  const [directionLines, nodeLines] = input.split('\n\n');

  const directions: Array<Direction> = directionLines.trim().split('') as Array<Direction>;
  const nodes = parseNodes(nodeLines.split('\n'));



  return traverseMapNodes(directions, nodes, 'AAA', 'ZZZ');
};

const part2: IPart = (input) => {
  return '';
};

export const Day: IDay = {
  part1,
  part2
};

