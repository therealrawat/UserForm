import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncryptionserviceServiceService } from '../encryptionservice-service.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {
  title = "User Details";
 
  name: string = ""
  dob: string = ""
  phoneNumber: string = ""
  email: string = ""
  gender: string = ""
  address: string = ""
  imgSource: string = ""
  zipcode:string = ""
  country:string = ""
  
  city:string = ""
  state:string = ""

  data: any

  str:any;

  constructor(private encrypt:EncryptionserviceServiceService,private route: ActivatedRoute, private services: ServicesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.str = param['id'];
      
      this.str=this.encrypt.decryptUsingAES256(this.str)
      
      this.getDataByID(this.str)
    });
  }

  getDataByID(id: any) {
    this.services.GetDataByID(id).subscribe((res: any) => {
      console.warn("res",res);
      
      this.name = res.firstName + " " + res.lastName
      this.address = res.address
      this.gender = res.gender
      this.city = res.cityName
      this.state = res.stateName
      this.imgSource = res.imageFilename
      this.email = res.email
      this.phoneNumber = res.phoneNumber
      this.dob = res.dob
      this.country = res.countryName
      this.zipcode = res.postalCode

      
    })

  }

  // public SavePDF(): void {

  //   let DATA: any = document.getElementById('content');
  //   html2canvas(DATA).then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     // PDF.save('EmployeePaySlip.pdf');
  //     PDF.save(`${this.name}PaySlip.pdf`);
  //   });

  // }
}
