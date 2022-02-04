import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService, Vacancy } from '../services/api.service';
import { Editor, Toolbar } from 'ngx-editor';
import { ScoreSheet } from '../interfaces/scoresheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AboutVacancy } from '../dialog/dialog.component';

@Component({
  selector: 'app-add-vacancies',
  templateUrl: './add-vacancies.component.html',
  styleUrls: ['./add-vacancies.component.css']
})
export class AddVacanciesComponent implements OnInit, OnDestroy {


  vacancyForm: FormGroup = new FormGroup({
    vacancy_name: new FormControl('', Validators.required),
    deadline_date: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    requirements: new FormControl('', Validators.required),
    vacancies_number: new FormControl('', Validators.required),

  });



  scoreSheet: ScoreSheet = {};
  scoreSheetsArray: ScoreSheet[] = []
  remainingValue!: number;
  tempArr: any;
  editor!: Editor;
  sum!: number;
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
  editData: any;
  editorForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private api: ApiService,
  ) {
    //   this.scoreSheet = {
    //     score_identity: "",
    //     score_value: 100
    //   }
    //   this.scoreSheetsArray.push(this.scoreSheet)

  }
  ngOnInit(): void {
    this.editor = new Editor();
  }

  findSumArr(A: any[], N: number): number {
    if (N <= 0) {
      return 0;
    }
    else {
      return (this.findSumArr(A, N - 1) + A[N - 1]);
    }
  }

  addScoreCard() {
    // for (let s in this.scoreSheetsArray) {
    //   console.log(s);

    //   this.tempArr = [];
    //   this.tempArr.splice(s, 0, this.scoreSheetsArray[s].score_value);
    // }
    // this.remainingValue = 100 - this.findSumArr(this.tempArr, this.tempArr.length)

    this.scoreSheet = {
      score_identity: "",
      score_value: 0
    }
    this.scoreSheetsArray.push(this.scoreSheet);

  }

  removeScoreCard(index: number) {
    this.scoreSheetsArray.splice(index, 1)
  }


  ngOnDestroy(): void {
    this.editor.destroy();
  }

  addVacancy() {
    this.sum = this.scoreSheetsArray.map(a => a.score_value).reduce(function (a = 0, b = 0) {
      return a + b;
    })!;
    this.vaca = {
      id: this.vacancyForm.get('id')?.value,
      vacancy_name: this.vacancyForm.get('vacancy_name')?.value,
      department: this.vacancyForm.get('department')?.value,
      deadline_date: this.vacancyForm.get('deadline_date')?.value,
      requirements: this.vacancyForm.get('requirements')?.value,
      vacancies_number: this.vacancyForm.get('vacancies_number')?.value,
      score_card: this.scoreSheetsArray
    }
    if (this.sum <= 100 && this.sum >=0) {
      if ((this.vacancyForm.valid)) {
        this.api.postVacancy(this.vaca)
          .subscribe({
            next: (response: any) => {
              alert('vacancy added succesfully')
              this.vacancyForm.reset();

            },
            error: (err: any) => {
              console.log(err)
              alert('Error while adding the vacancy ')
            }
          })
      }
      console.log("-------------");
      console.log(this.sum);
      console.log("-------------");
    }
    else {
     alert("Check the values of the Evaluation Matrix!!( Between 0-100)")
console.log(this.sum);

    }
  
  }
}
