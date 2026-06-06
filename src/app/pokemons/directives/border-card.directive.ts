import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

const TYPE_COLORS: { [key: string]: string } = {
  Feu: '#ff6b35',
  Eau: '#4fc3f7',
  Plante: '#66bb6a',
  Electrik: '#ffd600',
  Poison: '#ab47bc',
  Psy: '#ec407a',
  Normal: '#90a4ae',
  Vol: '#80deea',
  Insecte: '#aed581',
  Fée: '#f48fb1',
};

@Directive({
  selector: 'pkmnBorderCard',
  standalone: true,
})
export class BorderCardDirective implements OnInit {
  @Input() pokemonType: string = 'Normal';

  private defaultHeight: number = 200;

  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.el.nativeElement.style.transition =
      'transform 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
    this.el.nativeElement.style.border = 'solid 4px #f5f5f5';
    this.el.nativeElement.style.background = '#ffffff';
  }

  ngOnInit() {}

  private getTypeColor(): string {
    return TYPE_COLORS[this.pokemonType] || '#009686';
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = this.getTypeColor();
    this.el.nativeElement.style.border = `solid 4px ${color}`;
    this.el.nativeElement.style.background = `${color}22`;
    this.el.nativeElement.style.transform = 'scale(1.05)';
    this.el.nativeElement.style.boxShadow = `0 8px 24px ${color}66`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.border = 'solid 4px #f5f5f5';
    this.el.nativeElement.style.background = '#ffffff';
    this.el.nativeElement.style.transform = 'scale(1)';
    this.el.nativeElement.style.boxShadow = 'none';
  }
}
