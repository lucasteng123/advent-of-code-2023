import { IDay, IPart } from '../internalTypes';
import { findLCM } from '../utils';

type Direction = 'R' | 'L'

interface INode {
  leftNode: string
  rightNode: string
}

const parseNodes = (lines: Array<string>): {[node: string]: INode} => {
  const nodes: {[node:string]: INode} = {};
  lines.forEach(line => {
    const [key, node] = line.split(' = ');
    const [left, right] = node.matchAll(/[A-Z\d]{3}/g);
    nodes[key] = {
      leftNode:left[0],
      rightNode: right[0]
    };
  });
  return nodes;
};


const traverseMapNodes = (directions: Array<Direction>, nodes: {[node:string]:INode}, startingNode: string, end: (node: string)=>boolean): number => {
  let currentNode = startingNode;
  let steps = 0;
  while (!end(currentNode)) {
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

  return traverseMapNodes(directions, nodes, 'AAA', (n)=>n==='ZZZ');
};

const part2: IPart = (input) => {
  const [directionLines, nodeLines] = input.split('\n\n');

  const directions: Array<Direction> = directionLines.trim().split('') as Array<Direction>;
  const nodes = parseNodes(nodeLines.split('\n'));
  const startingNodes = Object.keys(nodes).filter(node=>node.slice(-1)==='A');

  const ghostLoopPeriods = startingNodes.map(startingNode => traverseMapNodes(directions,nodes,startingNode,(n)=>n.slice(-1)==='Z'));
  return findLCM(ghostLoopPeriods);
};

export const Day: IDay = {
  part1,
  part2
};

