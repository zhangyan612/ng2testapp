import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../fields.interface";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Output() elementClicked: EventEmitter<any> = new EventEmitter<any>();
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {
    if (!componentMapper[this.field.type]) {
      const supportedTypes = Object.keys(componentMapper).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.field.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = componentMapper[this.field.type];
    const factory = this.resolver.resolveComponentFactory<any>(component);
    //debugger
    this.componentRef = this.container.createComponent(factory); // create component
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

  ngOnChanges() {
    if (this.componentRef) {
      this.componentRef.instance.config = this.field;
      this.componentRef.instance.group = this.group;
    }
  }

  @HostListener('click',['$event']) onclick($event) {
    //debugger;
    this.elementClicked.emit(this.field);
  }

}
