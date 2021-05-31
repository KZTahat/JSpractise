'use strict';

let employees = [];
let total = 0;
function Employee(firstName, lastName, age, department, salary, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.department = department;
    this.phoneNumber = phoneNumber;
    this.salary = salary;

    employees.push(this);
}
let settingItems = function () {
    let data = JSON.stringify(employees);
    localStorage.setItem('employee', data);
}
function gettingItems() {
    let stringfyData = localStorage.getItem('employee');
    let normalData = JSON.parse(stringfyData);
    if (normalData !== null) {
        employees = normalData;
        renderTable();
    }
}

let tableDiv = document.getElementById('tableContainer');
let myForm = document.getElementById('myForm');
let table = document.createElement('table');
let renderTable = function () {
    // First Row
    let firstRowData = ['First Name', 'Last Name', 'Age', 'Department', 'Salary', 'Phone Number'];
    let tableFirstRow = document.createElement('tr');
    table.appendChild(tableFirstRow);
    for (let i = 0; i < firstRowData.length; i++) {
        let tdEl = document.createElement('td');
        tableFirstRow.appendChild(tdEl);
        tdEl.textContent = firstRowData[i];
    }
    tableDiv.appendChild(table);
    // other Rows from the form
    for (let i = 0; i < employees.length; i++) {
        let otherRow = document.createElement('tr');
        table.appendChild(otherRow);
        let tdEl1 = document.createElement('td');
        otherRow.appendChild(tdEl1);
        tdEl1.textContent = employees[i].firstName;
        // 
        let tdEl2 = document.createElement('td');
        otherRow.appendChild(tdEl2);
        tdEl2.textContent = employees[i].lastName;
        // 
        let tdEl3 = document.createElement('td');
        otherRow.appendChild(tdEl3);
        tdEl3.textContent = employees[i].age;
        // 
        let tdEl4 = document.createElement('td');
        otherRow.appendChild(tdEl4);
        tdEl4.textContent = employees[i].department;
        // 
        let tdEl6 = document.createElement('td');
        otherRow.appendChild(tdEl6);
        tdEl6.textContent = employees[i].phoneNumber;
        // 
        let tdEl5 = document.createElement('td');
        otherRow.appendChild(tdEl5);
        tdEl5.textContent = employees[i].salary;

    }
    let totalRow = document.createElement('tr');
    table.appendChild(totalRow);
    let tdElement = document.createElement('td');
    totalRow.appendChild(tdElement);
    tdElement.textContent = total;
}

function handelSubmit(event) {
    // event.preventDefault();
    let firstName = event.target.fname.value;
    let lastName = event.target.lname.value;
    let age = event.target.age.value;
    let department = event.target.department.value;
    let phoneNumber = event.target.phoneNumber.value;
    let salary = event.target.salary.value;
    total = total + salary;

    new Employee(firstName, lastName, age, department, phoneNumber, salary);
    settingItems();
    renderTable();
}

myForm.addEventListener('submit', handelSubmit);
gettingItems();