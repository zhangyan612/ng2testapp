import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  Output,
  EventEmitter,
  HostListener,
  OnChanges
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../fields.interface";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { TextComponent } from "../text/text.component";
import { debounceTime } from "rxjs/operators";
import { Subscription } from "rxjs";

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  text: TextComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  componentRef: ComponentRef<any>;
  valueChangeDelay = 1000;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {  
    if(!this.field.type){
      throw new Error(
        `Type (${this.field.type}) is not defined, probabaly server data is not retrieved`
      );
    }
    const component = componentMapper[this.field.type];
    if (!component) {
      const supportedTypes = Object.keys(componentMapper).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.field.type}).
        Supported types: ${supportedTypes}`
      );
    }
    
    const factory = this.resolver.resolveComponentFactory<any>(component);
    this.componentRef = this.container.createComponent(factory); // create component
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;

    //debugger
  }

  
  // ngOnDestroy(): void {
  //   console.log('ngOnDestroy')

  //   this.subscription.unsubscribe();
  // }

  // ngOnChanges() {
  //   console.log('ngOnChanges')
  //   // if (this.field) {
  //   //   this.componentRef.instance.field = this.field;
  //   //   this.componentRef.instance.group = this.group;
  //   // }
  // }
  // ngDoCheck(){
  //   console.log('do check')
  // }

  // ngAfterContentInit(){
  //   console.log('ngAfterContentInit')
  // }
  
  // ngAfterViewInit(){
  //   console.log('ngAfterViewInit')
  // }

  // ngAfterViewChecked(){
  //   console.log('ngAfterViewChecked')
  // }

  // @HostListener('click',['$event']) onclick($event) {
  //   //debugger;
  //   this.elementClicked.emit(this.field);
  // }

}
