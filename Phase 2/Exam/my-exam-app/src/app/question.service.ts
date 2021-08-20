import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import { Question } from './question';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // used to load data from a JSON file
  constructor(public http:HttpClient){ }

  loadQuestion() {
    return this.http.get<Question[]>("/assets/question.json");
  }
}
