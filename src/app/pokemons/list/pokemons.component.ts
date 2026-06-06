import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees/pokemon';
import { DatePipe } from '@angular/common';
import { PokemonTypeColor } from '../pipes/pokemon-type-color.pipe';
import { PokemonRarityPipe } from '../pipes/pokemon-rarity.pipe';
import { BorderCardDirective } from '../directives/border-card.directive';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { SearchPokemonComponent } from '../search-pokemons/search-pokemons.component';
import { AuthService } from '../../auth/auth.service';
import { listAnimation, cardAnimation } from '../../animations';

@Component({
  standalone: true,
  selector: 'list-pokemons',
  templateUrl: './pokemons.component.html',
  imports: [
    DatePipe,
    PokemonTypeColor,
    PokemonRarityPipe,
    BorderCardDirective,
    SearchPokemonComponent,
  ],
  animations: [listAnimation, cardAnimation],
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[];
  isLoggedIn = false;

  constructor(
    private router: Router,
    private pokemonService: PokemonsService,
    private authService: AuthService,
  ) {
    this.pokemons = [];
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => (this.isLoggedIn = !!user));
    this.pokemonService.getPokemons().subscribe((pokemons) => (this.pokemons = pokemons));
  }

  selectPokemon(pokemon: Pokemon) {
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

  addPokemon() {
    this.router.navigate(['/pokemon', 'add']);
  }

  deletePokemon(pokemon: Pokemon) {
    if (!confirm(`Supprimer ${pokemon.name} ?`)) return;
    this.pokemonService.deletePokemon(pokemon.id).subscribe(() => {
      this.pokemons = this.pokemons.filter((p) => p.id !== pokemon.id);
    });
  }
  comparePokemons(): void {
    this.router.navigate(['/pokemon/compare']);
  }
}
