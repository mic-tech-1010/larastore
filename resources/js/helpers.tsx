import { CartItem } from "./types";
import ProductController from "./actions/App/Http/Controllers/ProductController";

export const arraysAreEqual = (arr1: any[], arr2: any[]): boolean => {
  if(arr1.length !== arr2.length) return false; // check if lengths are the same

  return arr1.every((value: any, index: number): boolean => value === arr2[index]);
}

export const productRoute = (item: CartItem) => {
  const params = new URLSearchParams();
  Object.entries(item.option_ids)
    .forEach(([typeId, optionId]) => {
      params.append(`options[${typeId}]`, optionId + '')
    })

  return ProductController.show(item.slug).url + '?' + params.toString();
}
