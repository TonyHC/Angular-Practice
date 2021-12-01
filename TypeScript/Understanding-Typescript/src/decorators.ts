// Decorator Factory gives us more control of what the decorator function does internally
function Logger(logString: string) {
    // Decorator Function (for classes) run when People class was defined
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

// Decorator Factory
function WithTemplate(template: string, hookId: string) {
    // Decorator Function that replaces and extends the class the decorator applied
    // If no instance of People object was created, display empty string for html page
    // Otherwise, display name of People object was instantiated
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                const hookEl = document.getElementById(hookId);
                const people = new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
             }
        }
    }
}

// Decorator factorys executes top downwards
// Decorator functions executes bottom upwards (WithTemplate executes before Logger)
@Logger("LOGGING - PEOPLE")
@WithTemplate('<h1>My People Object</h1>', 'app')
class People {
    name = "Tom";

    constructor() {
        console.log("Creating people object...")
    }
}

const people = new People();

console.log(people);

// Decorator Function (for properties) runs when properties are defined for a class
function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator");
    console.log(target, propertyName);
}

// Decorator Function (for accessors)
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator");
    console.log(target, name, descriptor);
}

// Decorator Function (for methods)
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log("Method decorator");
    console.log(target, name, descriptor);
}

// Decorator Function (for parameters)
function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Parameter decorator")
    console.log(target, name, position);
}

class Product {
    @Log
    private title: string;
    private price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this.price + (1 + tax);
    }

    @Log2
    setPrice(val: number) {
        if (val > 0) {
            this.price = val;
        } else {
            throw new Error("Invalid price - should be positive");
        }
    }
}

// Function Decorator (for methods) to autobind the class in which the decorator was applied
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjDescriptor;
  }
  
  class Printer {
    message = 'This works!';
  
    @Autobind
    showMessage() {
      console.log(this.message);
    }
  }
  
  const printer = new Printer();
  printer.showMessage();
  
  const button = document.querySelector('button')!;
  button.addEventListener('click', printer.showMessage);

  interface ValidatorConfig {
    [property: string]: {
      [validatableProp: string]: string[]; // ['required', 'positive']
    };
  }
  
  const registeredValidators: ValidatorConfig = {};
  
  function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ['required']
    };
  }
  
  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ['positive']
    };
  }
  
  function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
      return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
      for (const validator of objValidatorConfig[prop]) {
        switch (validator) {
          case 'required':
            isValid = isValid && !!obj[prop];
            break;
          case 'positive':
            isValid = isValid && obj[prop] > 0;
            break;
        }
      }
    }
    return isValid;
  }
  
  class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;
  
    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }
  
  const courseForm = document.querySelector('form')!;
  courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
  
    const title = titleEl.value;
    const price = +priceEl.value;
  
    const createdCourse = new Course(title, price);
                
    if (!validate(createdCourse)) {
      alert('Invalid input, please try again!');
      return;
    }
    console.log(createdCourse);
  });