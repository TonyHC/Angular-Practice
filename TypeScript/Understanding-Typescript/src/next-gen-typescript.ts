// Default function parameters have to be last
const addTwoNumbers = (a: number, b: number = 6) => {
    return a + b;
};

// Arrow Function
const printOutput: (a: number | string) => void = output => console.log(output);

printOutput(addTwoNumbers(6));

const hobbies = ['Tennis', 'Coding'];
const activeHobbies = ['Cooking'];

// Spread Operator (...): Apply to both Arrays and Objects. It's used to pull out elements from Array or Object
// Adding a list of individual strings from hobbies array to activeHobbies array
activeHobbies.push(...hobbies);

for (const hobby of activeHobbies) {
    console.log(hobby);
}

const individual = {
    firstName: "Jadien",
    age: "14"
}

// Pull out all key-value pairs from individual and add to copiedIndividual object
const copiedIndividual = {...individual};

console.log(copiedIndividual.age);

// Rest Parameters: accept any number of the same type, which is stored in a array
const addAllNumbers = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};

printOutput(addAllNumbers(1, 51, 23, 4, 5, 63));

// Array destructuring: does not change existing array
// Stored first element to hobby1, second element to hobby2, remaining elements to rest parameter remainingHobbies
const [hobby1, hobby2, ...remainingHobbies] = activeHobbies;

console.log(hobby1, hobby2, remainingHobbies[0]);


// Object destructuring: must be property names from object
const { firstName: accountName, age} = individual;

console.log(accountName, age);