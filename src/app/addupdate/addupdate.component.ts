import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionserviceServiceService } from '../encryptionservice-service.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-addupdate',
  templateUrl: './addupdate.component.html',
  styleUrls: ['./addupdate.component.css']
})
export class AddupdateComponent {
  title = "Add New User"

  myForm!: FormGroup;
  constructor(private encrypt: EncryptionserviceServiceService, private _snackBar: MatSnackBar, private services: ServicesService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  cId: number = 0;
  map: any = [];
  states: any = [];
  sID: number = 0;
  cities: any = [];
  countryvalue: any
  idData: any = 0;
  str: any
  ngOnInit() {

    this.route.queryParams.subscribe(param => {
      this.str = param['id'];
      //id decrypted
      this.str = this.encrypt.decryptUsingAES256(this.str)
      this.idData = parseInt(this.str)
    });

    this.myForm = this.formBuilder.group({

      firstName: new FormControl('', [
        Validators.required,
      Validators.maxLength(20)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(16)
      ]),
      stateId: new FormControl('', [
        Validators.required
      ]),
      cityId: new FormControl('', [
        Validators.required
      ]),
      countryId: new FormControl('', [
        Validators.required
      ]),
      postalCode: new FormControl('', [
        Validators.required
      ]),
      imageFilename: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      dob: new FormControl('', [
        Validators.required
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required, Validators.maxLength(10), Validators.minLength(10)
      ])
    })

    this.getById(this.idData);

    this.getCountries();

    if (this.idData > 0) {
      this.title = "Update User"
    }
  }

  get firstName() {
    return this.myForm.get('firstName')
  }
  get lastName() {
    return this.myForm.get('lastName')
  }

  get companyName() {
    return this.myForm.get('companyName')
  }
  get address() {
    return this.myForm.get('address')
  }
  get stateId() {
    return this.myForm.get('stateId')
  }
  get cityId() {
    return this.myForm.get('cityId')
  }
  get countryId() {
    return this.myForm.get('countryId')
  } get postalCode() {
    return this.myForm.get('postalCode')
  }
  get gender() {
    return this.myForm.get('gender')
  }
  get imageFilename() {
    return this.myForm.get('imageFilename')
  }
  get phoneNumber() {
    return this.myForm.get('phoneNumber')
  }
  get email() {
    return this.myForm.get('email')
  }


//GetUserBYID

  getById(id: number) {
    console.warn("ouside function", id);
    this.services.GetDataByID(id).subscribe((res: any) => {

      this.getStateData(res.countryId)
      this.getCityData(res.stateId)
      this.myForm.patchValue(res)

    })
  }

  UpdateData(data: any) {
    data.Id = this.idData;
    console.log(data.Id, this.idData)
    this.services.AddEditEmployee(data).subscribe((result) => {
      console.warn(result);
      if (result && data.Id > 0) {
        this._snackBar.open(data.firstName + "'s details have been updated.", "close", { duration: 2500, horizontalPosition: 'center', verticalPosition: 'top' });
        this.router.navigate(['datalist'])
      }
      else if (!data.Id) {
        this._snackBar.open("A new employee has been added.", "close", { duration: 2500, horizontalPosition: 'center', verticalPosition: 'top' });
        this.router.navigate(['datalist'])
      }
      else {
        this._snackBar.open("Errors.", "close", { duration: 2500 });
      }
    })

  }

//GetCOuntries
  getCountries() {
    this.services.GetCountry().subscribe((res: any) => {
      console.warn(res);
      this.countryvalue = res;
    })
  }
//GetState
  getStateData(id: any) {
    this.services.GetStateById(id).subscribe((res: any) => {
      console.warn("states", res);
      this.states = res

      // this.sID = res.value.stateId
    })
  }

  getCityData(id: any) {
    this.services.GetCityById(id).subscribe((res:any) => {
      this.cities = res
      console.warn(this.cities[0].cityName);
      
    })
  }

  genders = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
    {value: 'Others', viewValue: 'Others'}
  ];

}
