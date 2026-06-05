import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees/pokemon';
import { PokemonsService } from '../pokemons.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PokemonTypeColor } from '../pipes/pokemon-type-color.pipe';
import { PokemonRarityPipe } from '../pipes/pokemon-rarity.pipe';
import { BorderCardDirective } from '../directives/border-card.directive';

@Component({
  standalone: true,
  selector: 'favorites-pokemons',
  templateUrl: './favorites.component.html',
  imports: [DatePipe, PokemonTypeColor, PokemonRarityPipe, BorderCardDirective],
})
export class FavoritesComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(
    private pokemonsService: PokemonsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.pokemonsService.getFavoritePokemons().subscribe((p: Pokemon[]) => (this.pokemons = p));
  }

  selectPokemon(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
