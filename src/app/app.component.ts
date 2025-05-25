import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ReactiveFormsModule,CommonModule],
})
export class AppComponent {
  title = 'angularcrud';

  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    //debugger;
    // Check if there is existing data in localStorage
 
  }

  ngOnInit(){
       const oldData = localStorage.getItem('emplData');
    if (oldData != null) {
      const parsedData = JSON.parse(oldData)
      this.employeeList = parsedData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId, [Validators.required]),
      name: new FormControl(this.employeeObj.name),
      email: new FormControl(this.employeeObj.email),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
    });
  }
  reset() {
    this.employeeObj = new EmployeeModel();
    this.createForm();
    this.employeeForm.reset();
  }

  onSave() {
    debugger;
    const oldData = localStorage.getItem('emplData');
    if (oldData != null) {
      const parsedData = JSON.parse(oldData)
      this.employeeForm.controls['empId'].setValue(parsedData.length + 1);
      this.employeeList.unshift(this.employeeForm.value)
    }
    else {
      this.employeeList.unshift(this.employeeForm.value)

    }
    localStorage.setItem('emplData', JSON.stringify(this.employeeList));
    this.reset();

  }


  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createForm()


  }
  onUpdate() {
    const record = this.employeeList.find((item: EmployeeModel) => item.empId === this.employeeForm.controls['empId'].value);
    if (record != undefined) {
      record.name = this.employeeForm.controls['name'].value;
      record.email = this.employeeForm.controls['email'].value;
    }
    localStorage.setItem('emplData', JSON.stringify(this.employeeList));
    this.reset();
  }


  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete this record?');
    if (isDelete) {
      const index = this.employeeList.findIndex((item: EmployeeModel) => item.empId === id);
      this.employeeList.splice(index, 1);
      localStorage.setItem('emplData', JSON.stringify(this.employeeList));
    }
  }
}
