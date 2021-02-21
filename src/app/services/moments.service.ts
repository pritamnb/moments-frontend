import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Enviroment from '../../environments/environment';
export interface createMoment {
  userId: string;
  imageUrl: string;
  tags: [];
  title: string;
}
@Injectable({
  providedIn: 'root',
})
export class MomentsService {
  private API_URL: string = Enviroment.environment.BASE_URL;

  constructor(private http: HttpClient, private router: Router) {}
  /**
   * This API will return the imageURL
   * @param image type file
   */
  public uploadImage(file: any) {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(`${this.API_URL}/image/upload`, formData);
  }
  public createMoment(payload: createMoment) {
    return this.http.post(`${this.API_URL}/moment/create`, payload);
  }
}
