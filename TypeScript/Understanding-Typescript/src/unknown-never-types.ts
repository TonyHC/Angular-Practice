// Unknown types takes any type and has type checks built in
let userInput: unknown;
let userName: string;

userInput = 6.2;
userInput = "Tom";

if (typeof userInput == 'string') {
    userName = userInput;
}

console.log(userInput);

// Return type is void but can be never type
// Never type can be assoicated with functions that throw an exception or infinite loop
function generateError(message: string, code: number): never {
    throw {message: message, errorCode: code}; // JS allows throwing an object as an error
}

generateError("An error occurred", 500);