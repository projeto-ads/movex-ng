import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  profile: {
    email: string;
    password: string;
  } = {
    email: '',
    password: '',
  };

  form: FormGroup

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.profile = this.form.getRawValue();
    if (this.profile && this.profile.email && this.profile.password) {
      this.authService
        .login(this.profile.email, this.profile.password)
        .subscribe(
          (result) => {
            this.router.navigate(['home']);
          },
          (error) => {
            alert('Email ou senha incorretos!');
          }
        );
    }
  }
}
