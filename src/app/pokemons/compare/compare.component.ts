import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees/pokemon';
import { PokemonsService } from '../pokemons.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonTypeColor } from '../pipes/pokemon-type-color.pipe';
import { PokemonRarityPipe } from '../pipes/pokemon-rarity.pipe';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'compare-pokemons',
  templateUrl: './compare.component.html',
  imports: [FormsModule, PokemonTypeColor, PokemonRarityPipe, DatePipe],
})
export class CompareComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemon1: Pokemon | null = null;
  pokemon2: Pokemon | null = null;
  selectedId1: number = 0;
  selectedId2: number = 0;

  constructor(
    private pokemonsService: PokemonsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.pokemonsService.getPokemons().subscribe((p) => (this.pokemons = p));
  }

  compare(): void {
    this.pokemon1 = this.pokemons.find((p) => p.id === +this.selectedId1) || null;
    this.pokemon2 = this.pokemons.find((p) => p.id === +this.selectedId2) || null;
  }

  goBack(): void {
    this.router.navigate(['/pokemon/all']);
  }
}
