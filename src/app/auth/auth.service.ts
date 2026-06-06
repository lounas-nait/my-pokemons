import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Récupère l'user au démarrage
    supabase.auth.getUser().then(({ data }) => {
      this.currentUserSubject.next(data.user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      this.currentUserSubject.next(session?.user ?? null);
    });
  }

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Signup error:', error.message);
      throw error;
    }
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Login error:', error.message);
      throw error;
    }
    return data;
  }

  async signOut() {
    await supabase.auth.signOut();
  }

  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }
}
