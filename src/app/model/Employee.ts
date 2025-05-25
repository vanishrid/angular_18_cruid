export class EmployeeModel {
    empId: number;
    name: string;
    city: string;
    state: string;
    email: string;


    constructor(){
        this.empId =0;
        this.name='';
        this.city='';
        this.state='';
        this.email='';
    }
}