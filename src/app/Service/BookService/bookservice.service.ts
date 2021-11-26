import { Injectable } from '@angular/core';
import { HttpserviceService } from '../HttpService/httpservice.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
  constructor(private http: HttpserviceService) {}

  getBooks() {
    return this.http.get(`${environment.baseUrl}api/get-books`, '');
  }
}
