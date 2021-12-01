import _, { shuffle } from 'lodash';
import 'reflect-metadata'
import {plainToInstance} from 'class-transformer'
import {validate} from 'class-validator'

import {Item} from './product.model';

// declare keyword tells typescript that variables (global) or features exist

console.log(shuffle([1,2,3]));

const items = [
    {title: 'Knife', price: 12.50}, 
    {title: 'Pot', price: 19.99}];

const loadedItems = plainToInstance(Item, items);

const newItem = new Item('', -2.99);
validate(newItem).then(errors => {
    if (errors.length > 0) {
        console.log(errors);
    }

    console.log(item1.getInformation());
})

const item1 = new Item('A Book', 9.99);

console.log(item1.getInformation());

for (const item of loadedItems) {
    console.log(item.getInformation());
}