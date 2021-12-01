abstract class Department {
    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(protected readonly id: number, protected name: string) {

    }   

    abstract describe(): void;

    static createEmployee(name: string) {
        return {name: name};
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees);
    }

    get getId() {
        return this.id;
    }

    get getName() {
        return this.name;
    }

    set setName(name: string) {
        this.name = name;
    }
}

class ITDepartment extends Department {
    constructor(id: number, private admins: string[]) {
        super(id, "IT");
    }

    get getAdmins() {
        return this.admins;
    }

    set setAdmins(admins: string[]) {
        this.admins = admins;
    }

    describe(): void {
        console.log("IT Department Id: " + this.id);
    }
}

class AccountingDepartment extends Department {
    private static instance: AccountingDepartment;

    // Singleton Pattern: Only have one instance of this class and use a Private Constructor
    private constructor(id: number, private reports: string[]) {
        super(id, "Accounting");
    }

    // Static method either returns existing instance of this class or creates and returns new instance of this class
    static getAccountingDepartmentInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }

        this.instance = new AccountingDepartment(2, []);
        return this.instance;
    }

    addEmployee(name: string) {
        if (name == "Mark") {
            return;
        }

        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }

    get getReports() {
        return this.reports;
    }

    set setReports(reports: string[]) {
        this.reports = reports; 
    }

    describe(): void {
        console.log("Account Department Id: " + this.id);
    }
}

const employee1 = Department.createEmployee("Rob");
console.log(employee1);
console.log("Department fiscal year: " + Department.fiscalYear);

const it = new ITDepartment(1, ["Thomas"]);

it.setName = "Tommy";

it.addEmployee("Tom");
it.addEmployee("Roy");

it.describe();
it.printEmployeeInfo();

console.log(it);

// New instance of AccountDepartment
const newAccountingDepartment = AccountingDepartment.getAccountingDepartmentInstance();
// Returns existing instance of AccountDepartment
const existingAccountingDepartment = AccountingDepartment.getAccountingDepartmentInstance();

console.log(newAccountingDepartment, existingAccountingDepartment);

console.log("Accounting Department Id: " + existingAccountingDepartment.getId);

existingAccountingDepartment.addReport("Failed to load report");
existingAccountingDepartment.printReports();

existingAccountingDepartment.addEmployee("Kurt");
existingAccountingDepartment.addEmployee("Mark");

existingAccountingDepartment.printEmployeeInfo();