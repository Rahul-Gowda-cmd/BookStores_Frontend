import { Injectable } from '@angular/core';
import { HttpserviceService } from './HttpService/httpservice.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  constructor(private http: HttpserviceService) {}

  user = JSON.parse(localStorage.getItem('BookStoreUser')!);

  Register(data: any) {
    let userData = {
      fullName: data.FullName,
      email: data.Email,
      password: data.Password,
      phone: data.Mobile,
    };
    console.log(userData);
    return this.http.post(`${environment.baseUrl}api/register`, userData);
  }

  Login(data: any) {
    let userData = {
      email: data.email,
      password: data.password,
    };
    console.log(userData);
    return this.http.post(`${environment.baseUrl}api/login`, userData);
  }

  ForgotPassword(data: any) {
    const userData = {
      email: data.email,
    };
    console.log(data);
    return this.http.post(
      `${environment.baseUrl}api/forgot-password?email=${data.email}`
    );
  }

  ResetPassword(data: any, token: any, id: any) {
    console.log(data.password);
    const userData = {
      _id: parseInt(id),
      password: data.password,
      token: token,
    };
    return this.http.post(`${environment.baseUrl}api/reset-password`, userData);
  }
}
