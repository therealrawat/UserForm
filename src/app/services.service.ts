import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { EncryptionserviceServiceService } from './encryptionservice-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private _refreshrequired = new Subject<void>();
  
  get RequiredRefresh() {
    return this._refreshrequired;
  }

  constructor(private http:HttpClient, private encrypt:EncryptionserviceServiceService) { }
 
  getEmployee = 'http://localhost:5239/api/User/GetUserDetails'


  

 AddEditEmployee(data:any){
  return this.http.post('http://localhost:5239/api/User/AddUpdateUserDetails',data);
 }
 

  GetAllActiveEmployee()
  {
    return this.http.get(this.getEmployee)
  }


  DeleteEmployee(id: any)
  {
    return this.http.delete(`http://localhost:5239/api/User/DeleteUserDetails?id=${id}`).pipe(
      tap(()=>{
        this.RequiredRefresh.next()
      })
    )
  }

link:any

  GetDataByID(id:any)
   {
    console.warn("id picked by api",id);
    this.link =  this.http.get(`http://localhost:5239/api/User/GetUserID?id=${id}`)
    //http://localhost:5239/api/User/GetUserID?id=1
    return this.link
   }

   GetCountry()
   {
    return this.http.get('http://localhost:5239/api/User/GetCountry')
   }

   GetStateById(id:any)
   {
    return this.http.get(`http://localhost:5239/api/User/GetState?id=${id}`)
   }

   GetCityById(id:any)
   {
    return this.http.get(`http://localhost:5239/api/User/GetCity?id=${id}`)
   }
   
}
