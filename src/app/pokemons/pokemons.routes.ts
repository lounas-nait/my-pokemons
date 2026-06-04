import { Routes } from "@angular/router";
import { PokemonsComponent } from './list/pokemons.component';
import { DetailPokemonComponent } from './detail/detail-pokemon.component';
import { EditPokemonComponent } from './edit/edit-pokemon.component';

export const pokemonsRoutes: Routes = [
  { path: 'all', loadComponent:() => PokemonsComponent },
  { path: 'edit/:id', loadComponent:() => EditPokemonComponent },
  { path: ':id', loadComponent:() => DetailPokemonComponent },
]