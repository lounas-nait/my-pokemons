import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  getInitials(): string {
    if (!this.currentUser?.email) return '?';
    return this.currentUser.email.substring(0, 2).toUpperCase();
  }

  async logout() {
    await this.authService.signOut();
    this.currentUser = null;
    this.router.navigate(['/pokemon/all']);
  }
}
