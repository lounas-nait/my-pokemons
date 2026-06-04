import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'pokemonRarity', standalone: true, pure: true })
export class PokemonRarityPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: number | null | undefined): SafeHtml {
    const v = Number(value) || 0;
    const filled = Math.max(0, Math.min(5, Math.round(v)));
    const empty = 5 - filled;

    const filledColor = filled <= 2 ? '#65390d' : (filled <= 4 ? '#90a9a7' : '#fcd600');

    let html = '';
    for (let i = 0; i < filled; i++) {
      html += `<span style="color:${filledColor};font-size:1.4rem;">★</span>`;
    }
    for (let i = 0; i < empty; i++) {
      html += `<span style="color:#F5F0F0;font-size:1.4rem;">★</span>`;
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}