import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {


  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) : string {
    let item = localStorage.getItem(key);
    return  item === null ? '' : item;
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
