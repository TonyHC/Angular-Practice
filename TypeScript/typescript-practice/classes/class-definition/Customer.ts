class Customer {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

// Create an instance of Customer class
let myCustomer = new Customer("Thomas", "Marks");

console.log(myCustomer.firstName);
console.log(myCustomer.lastName);