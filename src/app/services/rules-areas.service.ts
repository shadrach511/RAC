import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from 'app/models/question';
import { RulesArea } from 'app/models/rulesArea';
import { RulesVersion } from 'app/models/rulesVersion';

@Injectable({
  providedIn: 'root'
})
export class RulesAreasService {

  constructor(private http: HttpClient) { }

  createRulesArea(rulesArea: RulesArea) {
    return this.http.post(`http://localhost:8080/api/auth/rulesareacreate`, rulesArea);
  }
  createRulesVersion(rulesVersion: RulesVersion) {
    console.log('rulesVersion ' + JSON.stringify(rulesVersion));
    return this.http.post(`http://localhost:8080/api/auth/rulesversioncreate`, rulesVersion);
  }
  getAll() {
    return this.http.get(`http://localhost:8080/api/auth/getAll`);
  }

  getRulesArea(id: number) {
    return this.http.get(`http://localhost:8080/api/auth/getRulesArea?id=` + id);
  }
  createQuestion(question: Question) {
    console.log('createQuestion ' + JSON.stringify(question));
    return this.http.post(`http://localhost:8080/api/auth/questioncreate`, question);
  }
  getQuestions(id: number) {
    return this.http.get(`http://localhost:8080/api/auth/getQuestions?id=` + id);
  }

}
