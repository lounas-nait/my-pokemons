import { Routes } from "@angular/router";
import { PokemonsComponent } from './list/pokemons.component';
import { DetailPokemonComponent } from './detail/detail-pokemon.component';
import { EditPokemonComponent } from './edit/edit-pokemon.component';
import { AddPokemonComponent } from './add/add-pokemon.component';

export const pokemonsRoutes: Routes = [
  { path: 'all', component: PokemonsComponent },
  { path: 'add', component: AddPokemonComponent },
  { path: 'edit/:id', component: EditPokemonComponent },
  { path: ':id', component: DetailPokemonComponent },
];