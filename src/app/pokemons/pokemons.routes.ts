import { Routes } from "@angular/router";
import { PokemonsComponent } from './list/pokemons.component';
import { DetailPokemonComponent } from './detail/detail-pokemon.component';
import { EditPokemonComponent } from './edit/edit-pokemon.component';

export const pokemonsRoutes: Routes = [
  { path: 'all', component: PokemonsComponent },
  { path: 'edit/:id', component: EditPokemonComponent },
  { path: ':id', component: DetailPokemonComponent },
];