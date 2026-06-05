import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees/pokemon';
import { PokemonTypeColor } from '../pipes/pokemon-type-color.pipe';
import { PokemonRarityPipe } from '../pipes/pokemon-rarity.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { PokemonsService } from '../pokemons.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'detail-Pokemon',
  templateUrl: 'detail-pokemon.component.html',
  imports: [PokemonTypeColor, PokemonRarityPipe, DatePipe],
})
export class DetailPokemonComponent implements OnInit {
  //variable qui va récupérer le pokemon sélectionné
  pokemon: Pokemon | null = null;
  pokemons: Pokemon[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonsService: PokemonsService,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = +params['id'];
          return forkJoin({
            pokemon: this.pokemonsService.getPokemon(id),
            pokemons: this.pokemonsService.getPokemons(),
          });
        }),
      )
      .subscribe(({ pokemon, pokemons }) => {
        this.pokemon = pokemon;
        this.pokemons = pokemons;
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  goEdit(pokemon: Pokemon) {
    let link = ['/pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }

  deletePokemon(pokemon: Pokemon) {
    if (!confirm(`Supprimer ${pokemon.name} ?`)) return;
    this.pokemonsService.deletePokemon(pokemon.id).subscribe(() => {
      this.router.navigate(['pokemon', 'all']);
    });
  }

  private currentIndex(): number {
    if (!this.pokemon) return -1;
    return this.pokemons.findIndex((p) => p.id === this.pokemon?.id);
  }

  hasPrevious(): boolean {
    const index = this.currentIndex();
    return index > 0;
  }

  hasNext(): boolean {
    const index = this.currentIndex();
    return index >= 0 && index < this.pokemons.length - 1;
  }

  goPrevious(): void {
    const index = this.currentIndex();
    if (index > 0) {
      const previous = this.pokemons[index - 1];
      this.router.navigate(['pokemon', previous.id]);
    }
  }

  goNext(): void {
    const index = this.currentIndex();
    if (index >= 0 && index < this.pokemons.length - 1) {
      const next = this.pokemons[index + 1];
      this.router.navigate(['pokemon', next.id]);
    }
  }
}
