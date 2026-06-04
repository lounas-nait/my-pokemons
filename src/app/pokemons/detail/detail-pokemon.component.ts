import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../donnees/pokemon";
import { PokemonTypeColor } from "../pipes/pokemon-type-color.pipe";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { PokemonsService } from "../pokemons.service";

@Component({
  standalone: true,
  selector: 'detail-Pokemon',
  templateUrl: 'detail-pokemon.component.html',
  imports: [PokemonTypeColor, DatePipe]
})
export class DetailPokemonComponent implements OnInit{

  //variable qui va récupérer le pokemon sélectionné
  pokemon: any = null;

  constructor(private route: ActivatedRoute, private router: Router,
              private pokemonsService : PokemonsService
              ){
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.pokemonsService.getPokemon(id).subscribe((pokemon) => this.pokemon = pokemon);
  }
  
  goBack(){
    this.router.navigate(['/']);
  }

  goEdit(pokemon: Pokemon){
    let link = ['/pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }

}
