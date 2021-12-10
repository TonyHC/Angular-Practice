import { Pipe, PipeTransform } from "@angular/core";

/*  
 * Custom Parameterize Pipe (pure pipe): 
 * If a string exceeds a certain amount of characters, 
 * then return a substring of the affected string starting from the first character 
*/
@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (value.length > args[0]) {
            return value.substr(0, args[0]) + " ...";
        }
        
        return value;
    }
}