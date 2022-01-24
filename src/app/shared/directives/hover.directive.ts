import {Directive, ElementRef, HostListener} from "@angular/core";

// hover directive for changing style of hovered element
@Directive({
  selector: '[hover]'
})
export class HoverDirective {

  constructor(
    private elementRef: ElementRef
  ) {

  }

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.color = 'red';
    this.elementRef.nativeElement.style.fontWeight = '900';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.color = 'black';
    this.elementRef.nativeElement.style.fontWeight = 'normal';
  }
}
