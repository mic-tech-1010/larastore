export const arraysAreEqual = (arr1: any[], arr2: any[]): boolean => {
  if(arr1.length !== arr2.length) return false; // check if lengths are the same

  return arr1.every((value: any, index: number): boolean => value === arr2[index]);
}
