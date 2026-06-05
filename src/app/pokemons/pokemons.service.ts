import { Injectable } from '@angular/core';
import { Pokemon } from './donnees/pokemon';
import { POKEMONS } from './donnees/mock-pokemons';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, Observable, of, map } from 'rxjs';

//Observable = flux de donnée
// of() = fabriquer un flux
// tap() = regarder le flux
// catchError() = protéger a)pp si le flux échoue

@Injectable({ providedIn: 'root' })
export class PokemonsService {
  constructor(private http: HttpClient) {}

  private pokemonUrl = 'api/pokemons';

  //Permet de regarder le flux de donnée en continu
  private log(log: string) {
    console.info(log);
  }

  // permet de gérer proprement les erreurs des appels http sans faire planter l'application
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  //Permet de récupérer tout les pokémons
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonUrl).pipe(
      tap((_) => this.log(`fetched pokemons`)),
      catchError(this.handleError(`getPokemons`, [])),
    );
  }

  //Permet de récupérer un pokémon
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;

    return this.http.get<Pokemon>(url).pipe(
      tap((_) => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`)),
    );
  }

  getPokemonTypes(): string[] {
    return ['Plante', 'Feu', 'Eau', 'Poison', 'Psy', 'Electrik', 'Normal', 'Fée', 'Vol', 'Insecte'];
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    };
    const url = `${this.pokemonUrl}/${pokemon.id}`;

    return this.http.put<Pokemon>(url, pokemon, httpOptions).pipe(
      tap((_) => this.log(`update pokemon id=${pokemon.id}`)),
      catchError(this.handleError<Pokemon>(`updatePokemon id=${pokemon.id}`)),
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    };

    return this.http.post<Pokemon>(this.pokemonUrl, pokemon, httpOptions).pipe(
      tap((newPokemon: Pokemon) => this.log(`added pokemon w/ id=${newPokemon.id}`)),
      catchError(this.handleError<Pokemon>('addPokemon')),
    );
  }

  deletePokemon(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    };
    const url = `${this.pokemonUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      tap((_) => this.log(`deleted pokemon id=${id}`)),
      catchError(this.handleError('deletePokemon')),
    );
  }

  searchPokemons(term: string, type?: string, rarity?: number): Observable<Pokemon[]> {
    const query = term.trim().toLowerCase();

    return this.http.get<Pokemon[]>(this.pokemonUrl).pipe(
      map((pokemons) =>
        pokemons.filter((pokemon) => {
          const matchesName = !query || pokemon.name.toLowerCase().includes(query);
          const matchesType = !type || pokemon.types.includes(type);
          const matchesRarity = rarity == null || pokemon.rarity === rarity;
          return matchesName && matchesType && matchesRarity;
        }),
      ),
      tap(() =>
        this.log(`fetched pokemons search=${term} type=${type || 'any'} rarity=${rarity ?? 'any'}`),
      ),
      catchError(this.handleError<Pokemon[]>(`searchPokemons term=${term}`)),
    );
  }

  toggleFavorite(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    };
    const updated = { ...pokemon, isFavorite: !pokemon.isFavorite };
    return this.http.put<Pokemon>(`${this.pokemonUrl}/${pokemon.id}`, updated, httpOptions).pipe(
      map(() => updated),
      tap((_) => this.log(`toggled favorite id=${pokemon.id}`)),
      catchError(this.handleError<Pokemon>('toggleFavorite')),
    );
  }

  getFavoritePokemons(): Observable<Pokemon[]> {
    return this.getPokemons().pipe(map((pokemons) => pokemons.filter((p) => p.isFavorite)));
  }
}
