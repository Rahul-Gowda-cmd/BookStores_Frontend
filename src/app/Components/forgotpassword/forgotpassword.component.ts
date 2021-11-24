import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/Service/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  ForgotPasswordForm!: FormGroup;

  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.ForgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  EmailValidation() {
    if (this.ForgotPasswordForm.get('email')?.hasError('required')) {
      return 'Add Email';
    } else if (this.ForgotPasswordForm.get('email')?.hasError('email')) {
      return 'Not a valid email';
    }
    return null;
  }

  ForgotPassword() {
    if (!this.ForgotPasswordForm.invalid) {
      console.log('Register method');
      this.userService.ForgotPassword(this.ForgotPasswordForm.value).subscribe(
        (result: any) => {
          if (result.success == true) {
            this.snackBar.open(result.message, '', { duration: 3000 });
            this.route.navigateByUrl('/login');
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
          this.snackBar.open(error.error.message, '', { duration: 3000 });
          if (error.error.message == 'Email not Sent') {
            this.route.navigateByUrl('/login');
          }
        }
      );
    }
  }
}
