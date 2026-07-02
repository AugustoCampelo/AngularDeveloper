import { Component, signal, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { form, Field } from '@angular/forms/signals';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthenticationService } from 'src/app/theme/shared/service/authentication.service';
import { DASHBOARD_PATH } from 'src/app/app-config';

import { IconService } from '@ant-design/icons-angular';
import { EyeInvisibleOutline, EyeOutline } from '@ant-design/icons-angular/icons';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth-login',
  imports: [CommonModule, RouterModule, SharedModule, Field],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  authenticationService = inject(AuthenticationService);
  private iconService = inject(IconService);
  private cd = inject(ChangeDetectorRef);

  showPassword = false;
  submitted = false;
  error = '';
  loading = false;
  returnUrl!: string;

  // Signal holding the form data
  private readonly loginData = signal<LoginData>({
    email: '',
    password: ''
  });

  // Create the signal form based on loginData signal
  loginForm = form(this.loginData);

  constructor() {
    this.iconService.addIcon(...[EyeOutline, EyeInvisibleOutline]);

    // Redirect if already logged in
    if (window.location.pathname !== '/auth/login') {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate([DASHBOARD_PATH]);
      }
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // Demo credentials (mock AuthenticationService): admin@gmail.com / Admin@123
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Helper to check form validity (both fields required)
  get isFormValid() {
    const val = this.loginForm().value();
    return val.email.trim() !== '' && val.password.trim() !== '';
  }

  onSubmit() {
    this.submitted = true;

    if (!this.isFormValid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm().value();

    this.authenticationService.login(email, password).subscribe({
      next: () => {
        this.router.navigate([DASHBOARD_PATH]);
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  socialMedia = [{ name: 'Google', logo: 'google.svg' }];
}
