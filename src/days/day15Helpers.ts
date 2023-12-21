
export interface Lens { 
  label: string, 
  focalLength?: number
}

export interface Box { 
  lenses: Lens[]
}

export type Operation = '=' | '-';
  

export const hashString = (string: string, startingValue = 0): number =>{
  return string
    .split('')
    .reduce((acc, char): number=>{
      return hashAlgorithm(char, acc);
    },startingValue);
}; 
  
export const hashAlgorithm = (character: string, currentValue: number): number => {
  let updatedValue = currentValue;
  updatedValue += character.charCodeAt(0);
  updatedValue = updatedValue*17;
  updatedValue = updatedValue % 256;
  
  return updatedValue;
};

export const parseLens = (lensString: string): [Lens, Operation] =>{
  const [, label, operation, focalLength] = /(.+)([=-])(\d*)/.exec(lensString)!;
  return [
    {label, focalLength: focalLength.length > 0 ? Number(focalLength) : undefined},
      operation as Operation
  ];
};