import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

/**
 * Generated class for the IonBackgroundDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[ion-background]' // Attribute selector
})
export class IonBackgroundDirective implements OnChanges {

  @Input() public bgColor: string;
  private currentColor: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    if (this.bgColor) {
      const classList: DOMTokenList = this.el.nativeElement.classList;
      if (this.currentColor) {
        classList.remove(this.currentColor);
      }
      const color = 'bg-' + this.bgColor;
      classList.add(color);
      this.currentColor = color;
    }
  }

}