import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../fields.interface";
@Component({
  selector: "app-input",
  templateUrl: './input.component.html',
  styles: []
})
export class InputComponent implements OnInit {
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {
    // this.group.valueChanges.subscribe(val => {
    //   this.changed.emit(val);
    //   console.log(val)
    // });
  }

  // ngOnChange() { // You can give any function name
  //   console.log(this.group.value)
  // }


}
