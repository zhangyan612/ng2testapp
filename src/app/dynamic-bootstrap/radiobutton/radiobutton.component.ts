import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../fields.interface";
@Component({
  selector: "app-radiobutton",
  templateUrl: './radiobutton.component.html',
  styles: []
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
