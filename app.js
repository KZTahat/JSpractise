'use strict';

let employees = [];
let total = 0;
let avgAge = 0;
function Employee(firstName, lastName, age, department, phoneNumber, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.department = department;
    this.phoneNumber = phoneNumber;
    this.salary = salary;
    this.classNumber;

    employees.push(this);
}
Employee.prototype.getRandomClass = function () {
    let min = 1;
    let max = 100;
    this.classNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}
let settingItems = function () {
    let data = JSON.stringify(employees);
    localStorage.setItem('employee', data);
    //
    let data2 = JSON.stringify(total);
    localStorage.setItem('Total', data2);
    //
    let data3 = JSON.stringify(avgAge);
    localStorage.setItem('Total', data3);
}
function gettingItems() {
    let stringfyData = localStorage.getItem('employee');
    let normalData = JSON.parse(stringfyData);
    //
    let stringTotal = localStorage.getItem('Total');
    let normalTotal = JSON.parse(stringTotal);
    //
    let stringAge = localStorage.getItem('Total');
    let normalAge = JSON.parse(stringAge);
    let newEmployee;
    if (normalData !== null) {
        total = normalTotal;
        avgAge = normalAge;
        for (let i = 0; i < normalData.length; i++) {
            newEmployee = new Employee(normalData[i].firstName, normalData[i].lastName, normalData[i].age, normalData[i].department, normalData[i].phoneNumber, normalData[i].salary);
        }
        newEmployee.renderTable();
    }
}

let tableDiv = document.getElementById('tableContainer');
let myForm = document.getElementById('myForm');
let table = document.createElement('table');
Employee.prototype.renderTable = function () {
    while (table.rows.length) {
        table.deleteRow(0);
    }
    // First Row
    let firstRowData = ['First Name', 'Last Name', 'Age', 'Department', 'Phone Number', 'Salary', 'Class Number'];
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
        let tdEl5 = document.createElement('td');
        otherRow.appendChild(tdEl5);
        tdEl5.textContent = employees[i].phoneNumber;
        // 
        let tdEl6 = document.createElement('td');
        otherRow.appendChild(tdEl6);
        tdEl6.textContent = `${employees[i].salary}$`;
        //
        let tdEl7 = document.createElement('td');
        otherRow.appendChild(tdEl7);
        tdEl7.textContent = employees[i].classNumber;
    }
    let lastRowData = ['', 'Average Age', Math.floor(avgAge), '', 'Total Salary', `${total}$`, ''];
    let totalRow = document.createElement('tr');
    table.appendChild(totalRow);
    for (let i = 0; i < lastRowData.length; i++) {
        let tdElement = document.createElement('td');
        totalRow.appendChild(tdElement);
        tdElement.textContent = lastRowData[i];
    }
}
let ageSum = 0;
function handelSubmit(event) {
    event.preventDefault();
    let firstName = event.target.fname.value;
    let lastName = event.target.lname.value;
    let age = event.target.age.value;
    let department = event.target.department.value;
    let phoneNumber = event.target.phoneNumber.value;
    let salary = event.target.salary.value;
    total = total + Number(salary);
    ageSum = ageSum + Number(age);

    let newEmployee = new Employee(firstName, lastName, age, department, phoneNumber, salary);
    avgAge = ageSum / employees.length;
    newEmployee.getRandomClass();
    settingItems();
    newEmployee.renderTable();
}

myForm.addEventListener('submit', handelSubmit);
gettingItems();