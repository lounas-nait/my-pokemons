import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.css'],
})
export class Signup {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async register() {
    try {
      await this.authService.signUp(this.email, this.password);
      this.successMessage = 'email_sent';
    } catch (error: any) {
      this.errorMessage = "Erreur lors de l'inscription : " + error.message;
    }
  }
}
