import { Pipe, PipeTransform } from '@angular/core';

/*  
 * Custom Filter (inpure) to filter a object's property by the user's input
 * By default when (pure: true), updating arrays or objects doesn't apply (trigger) the pipe, 
 * only changing the input would do so
 * If (pure: false), any updates to data (array or object) or user input would apply (trigger) 
 * the pipe (this can cause performance issues if list is big enough) 
 */
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // If array of objects is empty or user input is empty, then return the entire array
    if (value.length === 0 || args[0] === '') {
      return value;
    }

    // Empty array to store matching results
    const resultArray = [];
    
    // Iterate through the object's array and add matching results to temp array
    for (const item of value) {
      if (item[args[1]].includes(args[0].toLowerCase())) {
        resultArray.push(item);
      }
    }

    // return the matching results
    return resultArray;
  }
}