var Customer = /** @class */ (function () {
    function Customer(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Customer;
}());
// Create an instance of Customer class
var myCustomer = new Customer("Thomas", "Marks");
console.log(myCustomer.firstName);
console.log(myCustomer.lastName);
