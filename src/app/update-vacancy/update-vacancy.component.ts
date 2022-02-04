import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { ScoreSheet } from '../interfaces/scoresheet';
import { ApiService, Vacancy } from '../services/api.service';

@Component({
  selector: 'app-update-vacancy',
  templateUrl: './update-vacancy.component.html',
  styleUrls: ['./update-vacancy.component.css']
})
export class UpdateVacancyComponent implements OnInit {

  vacancyForm: FormGroup = new FormGroup({
    vacancy_name: new FormControl('', Validators.required),
    deadline_date: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    requirements: new FormControl('', Validators.required),
    vacancies_number: new FormControl('', Validators.required),

  });
  scoreSheet: ScoreSheet = {};
  scoreSheetsArray: any;
  remainingValue: number = 100
  tempArr: any = [];
  editor!: Editor;
  sum: number = 0
  vaca!: Vacancy;
  actionBtn: string = "save";

  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"],

  ];

  constructor(@Inject(MAT_DIALOG_DATA) private allData: Vacancy, private api: ApiService,) {
    this.vacancyForm.controls['vacancy_name'].setValue(this.allData.vacancy_name);
    this.vacancyForm.controls['deadline_date'].setValue(this.allData.deadline_date);
    this.vacancyForm.controls['department'].setValue(this.allData.department);
    this.vacancyForm.controls['requirements'].setValue(this.allData.requirements);
    this.vacancyForm.controls['vacancies_number'].setValue(this.allData.vacancies_number);
    // this.insertScoreCards();
  }


  ngOnInit(): void {
    this.editor = new Editor();
    console.log(this.insertScoreCards());
    
    this.insertScoreCards();
  }
  insertScoreCards() {
    this.api.getVacancyById(this.allData.id).subscribe(res=>{
      this.scoreSheetsArray=res.score_card;
    },error=>{


    });
}

  
  findSumArr(A: any[], N: number): number {
    if (N <= 0)
      return 0;
    return (this.findSumArr(A, N - 1) + A[N - 1]);
  }

  addScoreCard() {
    for (let s in this.scoreSheetsArray) {
      this.tempArr.splice(s, 0, this.scoreSheetsArray[s].score_value);
    }
    this.remainingValue = 100 - this.findSumArr(this.tempArr, this.tempArr.length)
    this.scoreSheet = {
      score_identity: "",
      score_value: this.remainingValue
    }
    this.scoreSheetsArray.push(this.scoreSheet);
    console.log(this.remainingValue);
  }
updateVacancy(){ 
  this.vaca = {
    id: this.vacancyForm.get('id')?.value,
    vacancy_name: this.vacancyForm.get('vacancy_name')?.value,
    department: this.vacancyForm.get('department')?.value,
    deadline_date: this.vacancyForm.get('deadline_date')?.value,
    requirements: this.vacancyForm.get('requirements')?.value,
    vacancies_number: this.vacancyForm.get('vacancies_number')?.value,
    score_card: this.scoreSheetsArray
  }
  console.log(this.vaca);
  if ((this.vacancyForm.valid)) {
    console.log(this.allData.id);
    this.api.updateVacancy(this.allData.id,this.vaca)
    .subscribe(res=>{
      alert('vacancy Updated succesfully')
    },error=>{

      alert('Error while updating the vacancy ')
    });
    
  
  }
    
    console.log(this.vacancyForm.value);

    
    // // this.api.putVacancy(this.vacancyForm.value, this.editData.id).subscribe({
    // //   next: (res) => {
    // //     alert("product updated successfully");
    // //     this.vacancyForm.reset();
    // //     this.dialogRef.close("update");
    // //   },
    // //   error: () => {
    // //     alert("Error while updating the record");
    // //   }
    // // })
  }

  


}
