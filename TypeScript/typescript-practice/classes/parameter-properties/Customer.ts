class Customer {
    // Parameter Properties shortcut
    constructor(private _firstName: string, private _lastName: string) {
   
    }

    // Access modifiers: get/set
    public get firstName(): string {
        return this._firstName;
    }

    public set firstName(firstName: string) {
        this._firstName = firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }
    
    public set lastName(value: string) {
        this._lastName = value;
    }
}

// Create an instance of Customer class
let myCustomer = new Customer("Thomas", "Marks");

console.log(myCustomer.firstName);
console.log(myCustomer.lastName);