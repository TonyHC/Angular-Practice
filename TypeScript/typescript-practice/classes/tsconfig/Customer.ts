class Customer {
    private _firstName: string;
    private _lastName: string;

    constructor(firstName: string, lastName: string) {
        this._firstName = firstName;
        this._lastName = lastName;
    }

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