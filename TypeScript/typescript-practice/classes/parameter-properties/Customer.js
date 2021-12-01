"use strict";
class Customer {
    // Parameter Properties shortcut
    constructor(_firstName, _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
    }
    // Access modifiers: get/set
    get firstName() {
        return this._firstName;
    }
    set firstName(firstName) {
        this._firstName = firstName;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
}
// Create an instance of Customer class
let myCustomer = new Customer("Thomas", "Marks");
console.log(myCustomer.firstName);
console.log(myCustomer.lastName);
