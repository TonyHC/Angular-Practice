// Custom function type
type AddFns = (a: number, b: number) => number;

interface AddFn {
    // Custom Interface function type
    (a: number, b: number): number;
}

let addNums: AddFns;

addNums = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    // Readonly interface property
    readonly name?: string;
    // Optional interface property
    outputName?: string;
}

// Extending Interfaces
interface Greetable extends Named {
    greet(phrase: string): void;
    // Optional method
    properGreeting?(greeting: string): boolean;
}

class Person implements Greetable {
    name?: string;

    // Optional Parameter: ? or default value
    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }

    greet(phrase: string): void {
        if (this.name) {
            console.log(phrase + " " + this.name);
        } else {
            console.log("Hi");
        }
    }
}

let person1: Greetable;

person1 = new Person();

person1.greet("Hello");