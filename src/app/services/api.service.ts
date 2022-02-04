// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor(private http: HttpClient) { }

//   postVacancy(data:any){
//     return this.http.post<any>("http://localhost:3000/vacancy/",data)
//   }
//   getVancies(){
//     return this.http.get<any>("http://localhost:3000/vacancy/")
//   }
//   putVacancy(data:any,id:number){
//     return this.http.put<any>("http://localhost:3000/vacancy/"+id,data)

//   }
//   deleteVacancy(id:number){
//     return this.http.delete<any>("http://localhost:3000/vacancy/"+id);
//   }
// }

export interface Vacancy {
  id: number;
  vacancy_name: string;
  department: string;
  deadline_date: string;
  requirements: string;
  vacancies_number: string;
  score_card: any;

}



import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.apiServiceUrl}/vacancy/all`);
  }

  public getVacancyById(vacancy_id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.apiServiceUrl}/vacancy/find/${vacancy_id}`);
  }


  public postVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(`${this.apiServiceUrl}/vacancy/add`, vacancy);
  }

  public updateVacancy(id:any,vacancy: Vacancy): Observable<Vacancy> {
    return this.http.put<Vacancy>(`${this.apiServiceUrl}/vacancy/update/${id}`, vacancy);
  }
  public deleteVacancy(vacancyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/vacancy/delete/${vacancyId}`);
  }
}
