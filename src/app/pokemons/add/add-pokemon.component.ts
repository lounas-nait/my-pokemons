import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees/pokemon';
import { PokemonTypeColor } from '../pipes/pokemon-type-color.pipe';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonsService } from '../pokemons.service';

@Component({
  standalone: true,
  selector: 'add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.css'],
  imports: [PokemonTypeColor, FormsModule],
})
export class AddPokemonComponent implements OnInit {
  pokemon: Pokemon = new Pokemon();
  types: string[] = [];

  constructor(
    private router: Router,
    private pokemonsService: PokemonsService,
  ) {
    this.types = this.pokemonsService.getPokemonTypes();
  }

  ngOnInit(): void {}

  hasType(type: string): boolean {
    return this.pokemon.types.indexOf(type) > -1;
  }

  selectType($event: any, type: string): void {
    const checked = $event.target.checked;
    if (checked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      if (index > -1) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }

    if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
      return false;
    }

    return true;
  }
  onSubmit(): void {
    const { id, ...pokemonWithoutId } = this.pokemon;
    this.pokemonsService.addPokemon(pokemonWithoutId as Pokemon).subscribe((newPokemon) => {
      this.router.navigate(['pokemon', 'all']);
    });
  }
  goBack(): void {
    this.router.navigate(['pokemon', 'all']);
  }
}
