import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/Service/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  ResetPasswordForm!: FormGroup;
  hide = false;
  token: any;
  id: any;
  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.id = this.route.snapshot.paramMap.get('id');
    this.ResetPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}'
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      OTP: new FormControl('', [Validators.required]),
    });
  }
  PasswordValidation() {
    if (this.ResetPasswordForm.get('password')?.hasError('required')) {
      return 'Enter Password';
    } else if (this.ResetPasswordForm.get('password')?.hasError('pattern')) {
      return 'Please enter a valid Password ';
    } else if (this.ResetPasswordForm.get('password')?.errors?.minlength) {
      return 'Should have minimum 8 characters';
    }
    return null;
  }

  ResetPassword() {
    console.log('Register method');
    this.userService
      .ResetPassword(this.ResetPasswordForm.value, this.token, this.id)
      .subscribe(
        (status: any) => {
          console.log(status);
          if (status.success == true) {
            this.snackBar.open(status.message, '', { duration: 2000 });
            this.router.navigateByUrl('/login');
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
          this.snackBar.open(error.error.message, '', { duration: 2000 });
          if (error.error.message == 'Reset Unsuccessfull!') {
            this.router.navigateByUrl('/login');
          }
        }
      );
  }
}
