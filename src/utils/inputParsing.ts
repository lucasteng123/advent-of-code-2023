

class AOCInput {
  inputString: string;
  constructor(input: string){
    this.inputString = input;
  }

  toLines(chr:string = '\n') {
    return this.inputString.split(chr);
  }

  toLinesAsNumberArray() {
    return this.inputString.split('\n').map(line=>line.split(' ').map(chr => Number(chr)));
  }
}


export const parseInput = (input: string)=>{
  return new AOCInput(input);
};