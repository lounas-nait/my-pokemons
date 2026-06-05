import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees/pokemon';
import { DatePipe } from '@angular/common';
import { PokemonTypeColor } from '../pipes/pokemon-type-color.pipe';
import { PokemonRarityPipe } from '../pipes/pokemon-rarity.pipe';
import { BorderCardDirective } from '../directives/border-card.directive';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { SearchPokemonComponent } from '../search-pokemons/search-pokemons.component';

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
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(
    private router: Router,
    private pokemonService: PokemonsService,
  ) {
    this.pokemons = [];
  }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((pokemons) => {
      console.log(pokemons);
      this.pokemons = pokemons;
      console.log(this.pokemons);
    });
    console.log(this.pokemons);
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
