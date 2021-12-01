import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  salesPersonList: SalesPerson[] = [
    new SalesPerson("Thomas", "Lurk", "TL@mail.com", 30000),
    new SalesPerson("Roy", "Augustine", "Ruga@mail.com", 60000),
    new SalesPerson("Ash", "Murphy", "Ashmuy@mail.com", 45000),
    new SalesPerson("Ray", "Wills", "Rwills@mail.com", 90000),
  ];

  allowNewPerson = false;
  personCreationStatus = "No person was created"
  personName = "Thomas";
  personCreated = false;
  personStatus = "offline";

  dates: any[] = [];

  constructor() { 
    setTimeout(() => {
      this.allowNewPerson = true;
    }, 2000);

    this.personStatus = Math.random() > 0.5 ? "online" : "offline";
  }

  ngOnInit(): void {
  }

  onCreatePerson() {
    this.personCreated = true;
    this.personCreationStatus = "Person was created. Name is " + this.personName;
    
    this.dates.push(new Date());
  }

  onUpdatePersonName(event: any) {
    this.personName = (<HTMLInputElement>event.target).value;
  }

  getColor() {
    return this.personStatus == "online" ? "green" : "red";
  }
}
