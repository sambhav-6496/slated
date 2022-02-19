import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators'; 
import { throwError } from 'rxjs';

const API_URL = "https://api.genderize.io/"
@Injectable({
  providedIn: 'root'
})

export class GenderService {

  constructor(private http: HttpClient) { }

  public getGender(name : string) {
    var params = new HttpParams();
    params = params.append("name", name);
    return this.http
      .get(API_URL, {params : params})
      .pipe(map(response=> response))
      .pipe(catchError(this.handleError));
    //  this.videoData;
  }

  private handleError(error: Response | any) {
    console.error("videosService::handleError", error);
    return throwError(error);
  }
}
