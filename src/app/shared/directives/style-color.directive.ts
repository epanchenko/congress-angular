import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStyleColor]',
})
export class StyleColorDirective implements OnInit {
  @Input() appStyleColor: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.color = this.appStyleColor;
  }
}
