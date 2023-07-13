import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNumbersonlydecrative]'
})
export class NumbersonlydecrativeDirective {

  constructor(private _element: ElementRef, private _renderer: Renderer2) { }

  str = '^[0-9]+$'
  // @HostListner
  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    // this._renderer.setStyle(this._element.nativeElement, 'transition', '0.6s');
    // this._renderer.setStyle(this._element.nativeElement, 'background-color', '#8d9ad8');
    return new RegExp(this.str).test(event.key)
  }
}
