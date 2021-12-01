// Type aliases with Union types
type Combinable = number | string;
// Type aliases with literal types combined with Union types
type ConversionDescriptor = "as-number" | "as-text";
// Type aliases can be used to "create" your own types. 
// You're not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.
type User = {name: string, age: number};

function combine(
    // This allows you to avoid unnecessary repetition and manage types centrally.
    input1: Combinable,
    input2: Combinable,
    resultConversion: ConversionDescriptor
) {
    let result;

    if (typeof input1 == "number" && typeof input2 == "number" || resultConversion == "as-number") {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + " " +  input2.toString();
    }

    return result;
}

function isOlder(user: User, checkAge: number) {
    return checkAge > user.age;
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("25", "21", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Marc", "Andrews", "as-text");
console.log(combinedNames);

let user = {name: "Thomas", age: 29};
console.log(isOlder(user, 36))