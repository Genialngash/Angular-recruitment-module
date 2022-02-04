import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ApiService, Vacancy } from 'src/app/services/api.service';
import { UpdateVacancyComponent } from '../update-vacancy/update-vacancy.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'vacancies';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id', 'vacancy_name', 'department', 'deadline_date', 'vacancies_number', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private dialog: MatDialog, private api: ApiService, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getAllVacancies()
  }

  showRequirementsDialog(id: number) {
    this.api.getVacancyById(id).subscribe(
      {
        next: (res) => {
       const dialogRef = this.dialog.open(DialogComponent, {
      data: { requirements:res.requirements,vacancy_name: res.vacancy_name }

    })
        },
        error: (err) => {
          alert("Error!!")
        }
      }
    ) 
  }

  getAllVacancies() {
    this.api.getVacancies().subscribe({
      next: (res) => {   
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
      , error: (err) => {        
        this._snackBar.open("Error: could not get available vacancies", "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      }
    })
  }

  editVacancy(row: any) {
    this.dialog.open(UpdateVacancyComponent, {
      width: '100%',
      height:"88%",
      data: row
    }).afterClosed().subscribe(val => {
      
        this.getAllVacancies();
    
    })
  }

  deleteVacancy(id: number) {
    console.log(id);
    if (window.confirm('Are you sure to delete?')) {
     
    this.api.deleteVacancy(id).subscribe({
      next: (res) => {
        this._snackBar.open("Delete was successful", "", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
        this.getAllVacancies();
      },
      error: () => {
        this._snackBar.open("Error deleting", "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      }
    })
  }

  }
 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}




// export interface DepartmentData {
//   id:String;
//   departmentName:String;
//   departmentMail: String;
//   createdAt:String;
//   updatedAt:String;
// }

// @Component({
//   selector: 'app-departments-management',
//   templateUrl: './departments-management.component.html',
//   styleUrls: ['./departments-management.component.scss']
// })
// export class DepartmentsManagementComponent implements OnInit, OnDestroy {
  
//   displayedColumns: string[] = ['id','departmentName','departmentMail','createdAt','updatedAt','action'];
//   dataSource!: MatTableDataSource<DepartmentData>;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//   subscription!: Subscription;
//   data: any;
//   error: any;

//   constructor(    
//     private departmentAPI: DepartmentService,
//     private _snackBar: MatSnackBar,
//     ) { }
//     ngOnInit() {
//       this.getDepartmentData();
//     }
//     ngOnDestroy(): void {
//       this.subscription.unsubscribe();
//     }
//     applyFilter(event: Event) {
//       const filterValue = (event.target as HTMLInputElement).value;
//       this.dataSource.filter = filterValue.trim().toLowerCase();
//       if (this.dataSource.paginator) {
//         this.dataSource.paginator.firstPage();
//       }
//     }
//     getDepartmentData() {
//      this.subscription =  this.departmentAPI.getDepartments().subscribe(res => {
//        this.data = res;
//         // Binding with the datasource
//         this.dataSource = new MatTableDataSource(this.data);
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//       })
//     }
//     onDelete(id: any) {
//       if (window.confirm('Are you sure to delete?')) {
//         this.ngOnDestroy();
//         this.departmentAPI.deleteDepartment(id).subscribe(res => {
//           // call to destro an instance
//           this._snackBar.open("Successful!", "X", {
//             horizontalPosition: this.horizontalPosition,
//             verticalPosition: this.verticalPosition,
//             duration: 3000,
//             panelClass: ['green-snackbar','login-snackbar'],
//           });
          
//           // call to reinitialize the table
//           this.ngOnInit();
//         }, err => {
//           this.error = err.error;
//           this._snackBar.open("Error: You can not delete a department which has got employees!", "Try again!", {
//             horizontalPosition: this.horizontalPosition,
//             verticalPosition: this.verticalPosition,
//             duration: 3000,
//             panelClass: ['red-snackbar','login-snackbar'],
//           });
//         })
//       }
//     }

// }

