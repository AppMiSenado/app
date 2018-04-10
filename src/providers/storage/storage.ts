import {Injectable} from "@angular/core";

@Injectable()
export class StorageProvider{
  private EXPIRE:  number = 14400000; //4h

  constructor() { }

  set(key: string, value:any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  destroy(key: string){
    return localStorage.removeItem(key);
  }

  getCache(key){
    let data = this.get(key);

    if (data) {
      let now = new Date().getTime();
      let time = this.get('date-'+key);
      if ((now - time) < this.EXPIRE) {
        return data
      }
    }
    return false;
  }

  setCache(key:string, data?: any){
    let now = new Date().getTime();

    this.set('date-'+key, now);
    this.set(key, data);
  }
}