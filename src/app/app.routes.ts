import { Routes } from '@angular/router';
import { CounterComponent } from './pokemons/counter/counter.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { pokemonsRoutes } from './pokemons/pokemons.routes';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemon/all', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'pokemon', children: pokemonsRoutes },
  { path: 'compteur', component: CounterComponent },
  { path: '**', component: PageNotFoundComponent },
];
