import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/Service/userservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  RegisterForm!: FormGroup;
  hide = false;
  signup = false;
  LoginForm!: FormGroup;
  testing = false;

  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {
    (this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#@$!%*?&])[A-Za-zd@#$!%*?&].{4,}'
        ),
        Validators.minLength(8),
      ]),
    })),
      (this.RegisterForm = new FormGroup({
        FullName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        Email: new FormControl('', [Validators.required, Validators.email]),
        Password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}'
          ),
        ]),
        Mobile: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[0-9]{10}$'),
        ]),
      }));
  }
  Register() {
    this.testing = true;
    if (!this.RegisterForm.invalid) {
      console.log(this.RegisterForm.value);
      this.userService.Register(this.RegisterForm.value).subscribe(
        (result: any) => {
          console.log(result);
          this.snackBar.open(result.message, '', {
            duration: 2500,
            panelClass: ['black-snackbar'],
          });
          if (result.success == true) {
            this.signup = false;

            this.RegisterForm.reset();
          }
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message, '', { duration: 2500 });
          if (error.error.message == 'Email Already Exists! Please Login') {
            this.signup = false;
          }
        }
      );
    }
  }

  Login() {
    if (!this.LoginForm.invalid) {
      console.log(this.LoginForm.value);
      this.userService.Login(this.LoginForm.value).subscribe(
        (result: any) => {
          if (result.success == true) {
            this.LocalStorage(result.result, result.result.accessToken);
            this.route.navigateByUrl('/home').then(() => {
              window.location.reload();
            });
          }
          this.snackBar.open(result.message, '', {
            duration: 2000,
          });
          this.LoginForm.reset();
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message, '', { duration: 2500 });
        }
      );
    }
  }

  LocalStorage(data: any, token: any) {
    var user = localStorage.getItem('BookStoreUser');
    if (user != null) {
      localStorage.removeItem('BookStoreUser');
    }
    console.log(data, token);
    let obj: any = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      moblienumber: data.phone,
      userId: data._id,
      token: token,
    };
    user = obj;
    console.log(obj);
    localStorage.setItem('BookStoreUser', JSON.stringify(user));
  }
}
