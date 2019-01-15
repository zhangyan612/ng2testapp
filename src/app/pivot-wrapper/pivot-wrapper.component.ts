import { Component, OnInit,Inject, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
// import 'pivottable/dist/pivot.min.js';
// import 'pivottable/dist/pivot.min.css';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-pivot-wrapper',
  templateUrl: './pivot-wrapper.component.html',
  styleUrls: ['./pivot-wrapper.component.css']
})
export class PivotWrapperComponent implements OnInit, OnChanges {
  @Input() data: any[];

  private el: ElementRef;
    constructor(@Inject(ElementRef)el: ElementRef) { 
       this.el = el;
  }
   
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void{
    console.log('on change trigger')
    if (!this.el ||
      !this.el.nativeElement ||
      !this.el.nativeElement.children){
          console.log('cant build without element');
          return;
   }
   var container = this.el.nativeElement;
   var inst = jQuery(container);
   var targetElement = inst.find('#output');

   if (!targetElement){
      console.log('cant find the pivot element');
      return;
   }

    //this helps if you build more than once as it will wipe the dom for that element
    while (targetElement.firstChild){
        targetElement.removeChild(targetElement.firstChild);
    }
    console.log(targetElement);
    //here is the magic
    if(this.data){
      console.log('building pivot')
      targetElement.pivotUI(this.data);
    }else{
      console.log('No data passed into pivot');
    }
  }
}
