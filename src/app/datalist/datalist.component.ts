import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptionserviceServiceService } from '../encryptionservice-service.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css']
})
export class DatalistComponent {

  title = "User List"
  displayedColumns = [ 'User', 'Name', 'Gender', 'Email', 'Dob', 'Country', 'Action'];
  today = new Date();
  deleteTime = '';


  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;
  


  ngOnInit(): void {
    this.get_data();
    this.services.RequiredRefresh.subscribe((res) => {
      this.get_data();
    })

  }
  constructor(private toastr: ToastrService,private _snackBar: MatSnackBar, public dialog: MatDialog, private services: ServicesService, private route: Router, private Obser: ServicesService, private encrypt: EncryptionserviceServiceService) {

    this.deleteTime = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  value: any
  dataSource: any;

  get_data() {
    this.services.GetAllActiveEmployee().subscribe((result) => {
      this.value = result
      console.warn(this.value);

      this.dataSource = new MatTableDataSource<any>(this.value)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })

  }
  delete(index: any) {

    console.warn(index);
    if (confirm("Confirm delete User?")) {
      
      console.warn("index deleted: ", index);
      this.services.DeleteEmployee(index).subscribe((result) => {
        console.warn(result);
        this._snackBar.open("User deleted successfully.", "close", { duration: 2500, horizontalPosition: 'right', verticalPosition: 'top' });
      });
    }
    else {
      // this._snackBar.open("", "close", { duration: 2500, horizontalPosition: 'right', verticalPosition: 'top' });
      this.toastr.error('User not deleted.', '200', {
        timeOut: 3000,
      });
    }
  }



  editData(id: number) {
    // console.warn(id);
    
    this.route.navigate(['addedit'], { queryParams: { id: this.encrypt.encryptUsingAES256(id) } });

    // this.encrypt.encryptionAES(id)
  }

  search(event: Event) {
    const filterVal = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterVal;
  }

  toAdd() {
    this.route.navigate(['addedit'])

  }

  viewUser(id: number) {
    // console.warn(id);
    
    this.route.navigate(['userdetails'], { queryParams: { id: this.encrypt.encryptUsingAES256(id) } });
  }

}
