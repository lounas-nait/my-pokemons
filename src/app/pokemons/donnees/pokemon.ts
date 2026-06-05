export class Pokemon {
  id: number;
  hp: number;
  cp: number;
  name: string;
  picture: string;
  types: Array<string>;
  rarity: number;
  is_favorite: boolean;
  created: Date;

  constructor() {
    this.id = 0;
    this.hp = 0;
    this.cp = 0;
    this.name = 'nom';
    this.picture = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png';
    this.types = [];
    this.rarity = 1;
    this.is_favorite = false;
    this.created = new Date();
  }
  // https://codeshare.io/5gyRyB
}
