// Object type
type Admin = {
    name: string;
    roles: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// Intersection type for object: all unique properties
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "Tom",
    roles: ['Manager'],   
    startDate: new Date()
};

type combinable = string | number;
type numeric = number | boolean;

// Intersection type for union of data types: all common data types
type universal = combinable & numeric;

// Function Overloads
function addingNums(a: number, b: number): number;
function addingNums(a: string, b: string): string;
function addingNums(a: string, b: number): string;
function addingNums(a: number, b: string): string;
function addingNums(a: Combinable, b: Combinable) {
    // Type guards are used when dealing with Unions
    // One example of type guard using typeof
    if (typeof a == 'string' || typeof b == 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

const addResult = addingNums("2", 6);

console.log(addResult);

const fetchedUserData = {
    id: 1,
    name: "Marcus",
    job: {
        title: "Policemen",
        description: "Protecting the roads"
    }
};

// Optional Chaining is used to confirm whether nested objects retrieved from some backend (db or server) has some property set.
// Used to check if property is not set or undefined
console.log(fetchedUserData?.job?.title);

// If null or undefined use default value. However, if its a ' ' (empty string), it will return ' ' 
const userFormInput = undefined;

// ?? -> Nullish Coalescing is used to check whether the value or object is null or undefined.
// If value or object is null, then use the default value specified after the nullish coalescing 
const storedData = userFormInput ?? 'DEFAULT';

console.log(storedData);

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
    console.log("Name: " + emp.name);

    // Another form of type guard for properties and methods in a custom class
    if ('roles' in emp) {
        console.log('Roles: ' + emp.roles);
    }

    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}

printEmployeeInfo(e1)

class Car {
    drive() {
        console.log("Driving...");
    }
}

class Truck {
    drive() {
        console.log("Driving a truck");
    }

    loadCargo(amount: number) {
        console.log("Loading cargo: " + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();

    // Another form of type guard for Classes and Objects
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(60);
    }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
    // Discriminated Union is a pattern and can be apply to classes or interfaces to make using type guards for objects easier
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
     // Discriminated Union
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function movingAnimal(animal: Animal) {
    let speed;

    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;    
    }

    console.log("Moving at speed: " + speed);
}

movingAnimal({type: 'bird', flyingSpeed: 30});

// Type Casting has two types <> or as 
// const userInputElement = <HTMLInputElement>document.getElementById("user-input");
// const userInputElement = document.getElementById("user-input")! as HTMLInputElement; // ! return value will be non-null

// userInputElement.value = "Hi there";

interface ErrorContainer {
    // Index types
    // In ErrorContainer, it can have any number of string properties
    // property and it's name must be a string
    [prop: string]: string; 
}

const errorBag: ErrorContainer = {
    email: "Not a valid email",
    userName: "First letter must be captialized"
};

console.log(errorBag);