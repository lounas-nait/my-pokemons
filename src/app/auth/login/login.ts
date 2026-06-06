import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async login() {
    try {
      await this.authService.signIn(this.email, this.password);
      this.router.navigate(['/pokemon/all']);
    } catch (error: any) {
      this.errorMessage = 'Email ou mot de passe incorrect.';
    }
  }
}
