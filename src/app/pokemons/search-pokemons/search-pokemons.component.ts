import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import {
  Observable,
  Subject,
  BehaviorSubject,
  of,
  debounceTime,
  switchMap,
  distinctUntilChanged,
  combineLatest,
  startWith,
} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../donnees/pokemon';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'search-pokemon',
  templateUrl: './search-pokemons.component.html',
  imports: [FormsModule, AsyncPipe],
})
export class SearchPokemonComponent implements OnInit {
  private searchTerms = new Subject<string>();
  private typeFilter = new BehaviorSubject<string>('');
  private rarityFilter = new BehaviorSubject<number | null>(null);
  pokemons!: Observable<Pokemon[]>;
  types: string[] = [];
  rarities = [1, 2, 3, 4, 5];

  constructor(
    private router: Router,
    private pokemonsService: PokemonsService,
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  selectType(type: string): void {
    this.typeFilter.next(type);
  }

  selectRarity(rarity: string): void {
    this.rarityFilter.next(rarity ? Number(rarity) : null);
  }

  ngOnInit(): void {
    this.types = this.pokemonsService.getPokemonTypes();

    this.pokemons = combineLatest([
      this.searchTerms.pipe(debounceTime(200), distinctUntilChanged(), startWith('')),
      this.typeFilter,
      this.rarityFilter,
    ]).pipe(
      switchMap(([term, type, rarity]) => {
        if (!term.trim() && !type && rarity == null) {
          return of([]);
        }
        return this.pokemonsService.searchPokemons(term, type, rarity ?? undefined);
      }),
    );
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
