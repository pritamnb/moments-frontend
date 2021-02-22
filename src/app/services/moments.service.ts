import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Enviroment from '../../environments/environment';
export interface createMoment {
  imageUrl: string;
  tags: any;
  title: string;
}
@Injectable({
  providedIn: 'root',
})
export class MomentsService {
  private API_URL: string = Enviroment.environment.BASE_URL;
  private editMomentObservable = new BehaviorSubject<any>({});
  _editMomentObservable = this.editMomentObservable.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  setEditMoment(moment) {
    this.editMomentObservable.next(moment);
  }
  /**
   * This API will return the imageURL
   * @param image type file
   */
  uploadImage(file: any) {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(`${this.API_URL}/image/upload`, formData);
  }
  createMoment(payload: createMoment) {
    return this.http.post(`${this.API_URL}/moment/create`, payload);
  }

  listAllMoments() {
    return this.http.get(`${this.API_URL}/moment/moment-list`);
  }
  deleteMoment(payload) {
    return this.http.post(`${this.API_URL}/moment/delete`, payload);
  }
  editMoment(payload) {
    return this.http.put(`${this.API_URL}/moment/update`, payload);
  }
  getMoment(momentId) {
    return this.http.get(`${this.API_URL}/moment/get-moment/${momentId}`);
  }
}
