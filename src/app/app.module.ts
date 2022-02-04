import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { HighchartsChartModule } from 'highcharts-angular';
import { DialogComponent } from './dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { ApiService } from './services/api.service';
import { DefaultComponent } from './default/default.component';
import { AddVacanciesComponent } from './add-vacancies/add-vacancies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateVacancyComponent } from './update-vacancy/update-vacancy.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
  
    DialogComponent,
       AddVacanciesComponent,
       UpdateVacancyComponent,
  
    

  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatTableModule,MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MaterialModule ,
    RouterModule,
    HighchartsChartModule,
    MatPaginatorModule,
     BrowserModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
  MatPaginatorModule,
    MatSortModule,
    NgxEditorModule,
    NgbModule,
      
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
