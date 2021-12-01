// Generic Function with generic constraints
function merge<T extends object, U extends object>(objectA: T, objectB: U) {
    return Object.assign(objectA, objectB);
}

const mergedObject = merge({name: "Roy", hobbies: ["Tennis"]}, {age: 22});

console.log(mergedObject.name);

interface Lengthy {
    length: number;
}

// Generic Function that takes in any type which has a length method built in
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = "No value";

    if (element.length == 1) {
        descriptionText = "Got 1 element";
    } else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements";
    }

    return [element, descriptionText];
}

console.log(countAndDescribe([2]));

// Generic Function which extracts and returns a property from a object
// Generic parameter T is constraint to any object
// Generic parameter U is constraint to any property from T (any object) using keyof
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return "Value of " + obj[key];
}

console.log(extractAndConvert({name: "Jake"}, "name"));

// Generic Class only works with primitive types
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) == -1) {
            return;
        }

        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();

textStorage.addItem("Hello"); 
textStorage.addItem("Kurt");
textStorage.removeItem("Hello");

console.log(textStorage.getItems());

/* const objectStorage = new DataStorage<object>();
const tomObject = {name: "Tom"};

objectStorage.addItem(tomObject); 
objectStorage.addItem({name: "Roy"});
objectStorage.removeItem(tomObject);

console.log(objectStorage.getItems()); */

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(
    title: string,
    description: string,
    date: Date
): CourseGoal {
    // Partial<T> generic utility type which converts the object's properties to be optional
    let courseGoal: Partial<CourseGoal> = {};
    
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}

// Readonly<T> generic utility type marks the type (array) as readonly, which cannot modify the data
const names: Readonly<string[]> = ["Mark", "Luke"];