import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  constructor(private http: HttpClient) {}

  post(
    url: string,
    data: any = null,
    isHeaderRequired: any = false,
    headers: any = null
  ) {
    console.log(data);
    console.log(headers);
    return this.http.post(url, data, isHeaderRequired && headers);
  }
  put(
    url: string,
    data: any = null,
    isHeaderRequired: any = false,
    headers: any = null
  ) {
    console.log(data);
    return this.http.put(url, data, isHeaderRequired && headers);
  }
  get(
    url: string,
    data: any,
    isHeaderRequired: any = false,
    headers: any = null
  ) {
    console.log(data);
    console.log(headers);
    return this.http.get(url, isHeaderRequired && headers);
  }

  delete(
    url: string,
    data: any,
    isHeaderRequired: any = false,
    headers: any = null
  ) {
    console.log(data);
    console.log(headers);
    return this.http.delete(url, isHeaderRequired && headers);
  }
}
