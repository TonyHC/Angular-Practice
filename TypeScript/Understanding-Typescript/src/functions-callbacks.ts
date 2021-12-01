function add(n1: number, n2: number) {
    return n1 + n2;
}


function printNumber(num: number) {
    console.log(num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

printNumber(add(4,2));

// Function Type
let combineValues: (num1: number, num2: number) => number;

combineValues = add;

console.log(combineValues(4, 3));

// Function type and Callback
addAndHandle(6, 4, (result) => {
    console.log(result * 6);
})