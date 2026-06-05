import { Injectable } from '@angular/core';
import { Pokemon } from './donnees/pokemon';
import { supabase } from '../supabase.client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonsService {
  // 🔵 LOG
  private log(msg: string) {
    console.info(msg);
  }

  // =========================
  // GET ALL POKEMONS
  // =========================
  getPokemons(): Observable<Pokemon[]> {
    return new Observable((observer) => {
      supabase
        .from('pokemons')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            observer.error(error);
          } else {
            this.log('fetched pokemons');
            observer.next(data as Pokemon[]);
            observer.complete();
          }
        });
    });
  }

  // =========================
  // GET ONE POKEMON
  // =========================
  getPokemon(id: number): Observable<Pokemon> {
    return new Observable((observer) => {
      supabase
        .from('pokemons')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            observer.error(error);
          } else {
            this.log(`fetched pokemon id=${id}`);
            observer.next(data as Pokemon);
            observer.complete();
          }
        });
    });
  }

  // =========================
  // ADD POKEMON
  // =========================
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return new Observable((observer) => {
      supabase
        .from('pokemons')
        .insert(pokemon)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) {
            observer.error(error);
          } else {
            this.log(`added pokemon id=${data.id}`);
            observer.next(data as Pokemon);
            observer.complete();
          }
        });
    });
  }

  // =========================
  // UPDATE POKEMON
  // =========================
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return new Observable((observer) => {
      supabase
        .from('pokemons')
        .update(pokemon)
        .eq('id', pokemon.id)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) {
            observer.error(error);
          } else {
            this.log(`updated pokemon id=${pokemon.id}`);
            observer.next(data as Pokemon);
            observer.complete();
          }
        });
    });
  }

  // =========================
  // DELETE POKEMON
  // =========================
  deletePokemon(id: number): Observable<any> {
    return new Observable((observer) => {
      supabase
        .from('pokemons')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) {
            observer.error(error);
          } else {
            this.log(`deleted pokemon id=${id}`);
            observer.next(true);
            observer.complete();
          }
        });
    });
  }

  // =========================
  // TYPES (inchangé)
  // =========================
  getPokemonTypes(): string[] {
    return ['Plante', 'Feu', 'Eau', 'Poison', 'Psy', 'Electrik', 'Normal', 'Fée', 'Vol', 'Insecte'];
  }

  // =========================
  // SEARCH (client-side)
  // =========================
  searchPokemons(term: string, type?: string, rarity?: number): Observable<Pokemon[]> {
    return new Observable((observer) => {
      supabase
        .from('pokemons')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            observer.error(error);
          } else {
            const query = term.trim().toLowerCase();

            const result = (data as Pokemon[]).filter((pokemon) => {
              const matchesName = !query || pokemon.name.toLowerCase().includes(query);
              const matchesType = !type || pokemon.types.includes(type);
              const matchesRarity = rarity == null || pokemon.rarity === rarity;
              return matchesName && matchesType && matchesRarity;
            });

            this.log(`search done`);
            observer.next(result);
            observer.complete();
          }
        });
    });
  }

  // =========================
  // FAVORITE TOGGLE
  // =========================
  toggleFavorite(pokemon: Pokemon): Observable<Pokemon> {
    const updated = { ...pokemon, is_favorite: !pokemon.is_favorite };

    return new Observable((observer) => {
      supabase
        .from('pokemons')
        .update(updated)
        .eq('id', pokemon.id)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) {
            observer.error(error);
          } else {
            this.log(`toggled favorite id=${pokemon.id}`);
            observer.next(data as Pokemon);
            observer.complete();
          }
        });
    });
  }

  // =========================
  // FAVORITES
  // =========================
  getFavoritePokemons(): Observable<Pokemon[]> {
    return new Observable((observer) => {
      supabase
        .from('pokemons')
        .select('*')
        .eq('is_favorite', true)
        .then(({ data, error }) => {
          if (error) {
            observer.error(error);
          } else {
            observer.next(data as Pokemon[]);
            observer.complete();
          }
        });
    });
  }

  getPokemonss(): Observable<Pokemon[]> {
    return new Observable((observer) => {
      supabase
        .from('pokemons')
        .select('*')
        .then((res) => {
          console.log('SUPABASE RESPONSE:', res);
          observer.next(res.data as Pokemon[]);
          observer.complete();
        });
    });
  }
}
