import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule} from '@angular/material/sort';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';

import {MatStepperModule} from '@angular/material/stepper'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatalistComponent } from './datalist/datalist.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from './home/home.component';
import { NumbersonlydecrativeDirective } from './numbersonlydecrative.directive';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DatalistComponent,
    UserdetailsComponent,
    AddupdateComponent,
    HomeComponent,
    NumbersonlydecrativeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MatButtonModule,MatIconModule,MatPaginatorModule,MatFormFieldModule,
    MatSortModule, MatInputModule, MatSelectModule, MatToolbarModule, MatTableModule,
    HttpClientModule, ReactiveFormsModule, 
    MatDialogModule,
    MatStepperModule,MatSnackBarModule,
    MatDatepickerModule, 
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
