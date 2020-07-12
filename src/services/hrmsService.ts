import {Observable,defer,from} from 'rxjs';
import {IEmployee} from '../model/employee';

class HrmsService{
    public apiCall=():Observable<IEmployee[]>=>{
        return defer(()=>{
            return from<Promise<IEmployee[]>>(
                fetch(`http://localhost:3500/employees`)
                .then(r=>r.json()).then(this.mapToEmployees)
            );
        });
    }

    public updateStatus = (data: any, id: string): Observable<any> => {
        return defer(() => {
          return from<Promise<any>>(
            fetch(`http://localhost:3500/employees/${id}`, {
              headers: { "Content-Type": "application/json"},
              method: "PUT",
              body: JSON.stringify(data)
            // body:activestatus
            })
          );
        });
      };



    public updateAttendance = (data: any, id: string): Observable<any> => {
        return defer(() => {
          return from<Promise<any>>(
            fetch(`http://localhost:3500/employees/${id}`, {
              headers: { "Content-Type": "application/json"},
              method: "PUT",
              body: JSON.stringify(data)
            // body:activestatus
            })
          );
        });
      };


      public postEmployee = (employee: any): Observable<any> => {
        return defer(() => {
          return from<Promise<any>>(
            fetch(`http://localhost:3500/employees`, {
              headers: { "Content-Type": "application/json; charset=utf-8" },
              method: "POST",
              body: JSON.stringify(employee)
            })
          );
        });
      };



      public updateEmployeeDetails = (data: any, id: string): Observable<any> => {
        return defer(() => {
          return from<Promise<any>>(
            fetch(`http://localhost:3500/employees/${id}`, {
              headers: { "Content-Type": "application/json"},
              method: "PUT",
              body: JSON.stringify(data)
            // body:activestatus
            })
          );
        });
      };


    private mapToEmployees=(employee:IEmployee[]):IEmployee[]=>{
        // console.log(employee);
        return employee.map(this.mapToEmployee);
    }

    private mapToEmployee(employee:IEmployee):IEmployee{
        return {
            _id:employee._id,
            username: employee.username, 
	        password: employee.password,
	        employeeId : employee.employeeId,
	        firstName : employee.firstName,
	        lastName: employee.lastName,
	        position : employee.position, 
	        activeStatus : employee.activeStatus,
	        attendance:employee.attendance
        }
    }
}
export default new HrmsService();

