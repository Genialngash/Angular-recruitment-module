import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vacancy } from '../services/api.service';


export interface AboutVacancy {
  requirements: string;
  vacancy_name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent implements OnInit {
  
  aboutVacancyData!: Vacancy;
 

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AboutVacancy ,
    @Inject(MAT_DIALOG_DATA) public allData: Vacancy ,
  ) { }

  ngOnInit(): void {
 
    
  }


}
