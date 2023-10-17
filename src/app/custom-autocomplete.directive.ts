import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appCustomAutocomplete]'
})

export class CustomAutocompleteDirective {
  @Input() set appCustomAutocomplete(value: any) {
    const text = value ? value.nombre : ''; // Ajusta esto según la propiedad que deseas mostrar
    this.renderer.setProperty(this.el.nativeElement, 'value', text);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

}
