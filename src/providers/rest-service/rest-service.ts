import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestServiceProvider {

  //url:string = 'https://api.foursquare.com/v2/venues/search';
  url:string = 'https://api.foursquare.com/v2/venues/search?v=20170101&client_id=ACRCH404EDWJVUPUYLLZCHOQXEUOZAVG02DPP4I3ZM5PL03T&client_secret=BV00LQACPGAUPYBTAOXZEDTOK4ZU4SHN4QAR3VEJOKY45MR5&near=';
  url2:string = ',Brasil&verified=true&categoryId=4bf58dd8d48988d113951735';

  constructor(public http: Http) {
    this.http = http;
  }

  public load(_cidade) {
   return this.http.get(this.url+_cidade+this.url2).map(res => res.json()).map(data => data.response.venues);
 }

}
