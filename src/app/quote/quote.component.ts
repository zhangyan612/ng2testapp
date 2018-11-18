import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { DataService } from '../services/data.service'
import { Quote } from '../model/quote';
import { Customer } from '../model/customer';
import { debounceTime } from 'rxjs/operators';
import { DynamicFormComponent } from '../dynamic-bootstrap/dynamic-form/dynamic-form.component';
import { FieldConfig } from "../dynamic-bootstrap/fields.interface";
import { quoteFields, navLinks, availableFields } from '../shared/fields-config';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  quote: Quote = { firstName:'Yan', lastName:'Zhang' } as Quote;
  errorMessage: string;
  languages: string[] = ['English', 'Spanish', 'Chinese']

  emailMessage: string;
  regConfig: FieldConfig[] = [];
  fields : FieldConfig[] = [];

  constructor(private dataService: DataService, private fb: FormBuilder) {
    
  }
  
  ngOnInit() {
    // this.customerForm.get('notification').valueChanges.subscribe(
    //   //value => this.setNotification(value)
    // );
    this.regConfig = availableFields;
  }

  getData(): void {
    
  }

  submit(value: any) {
    console.log(this.form);
    console.log(this.form.value);
    console.log(value);
  }

  save() {
    console.log(this.form);
    // console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  addTextField(): void {
    // let config = quoteFields[id];
    // // config.name= config.name+elementId;
    // console.log(this.form);
    // console.log(config);
    // const control = this.fb.control(
    //   config,
    //   this.bindValidations(config.validations || [])
    // );
    // this.form.addControl(config.name, control);
    //this.regConfig.push(config);
    this.regConfig = this.fields;
  }

  addConfig(data: FieldConfig[] ) {

    let additional = {
      id: 2,
      type: "input",
      label: "First Name",
      inputType: "text",
      name: "newname", //not working
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "First Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    }

    this.regConfig.push(additional);

  }

  printCurrent(){
    console.log(this.regConfig);
  }

  addLink(){
    navLinks.push({ text: 'Forms', path: '/forms' });
  }


  saveFields(){
    console.log(this.regConfig);

    this.dataService.saveList('fields', this.regConfig).subscribe(
      error => this.errorMessage = <any>error
    );

  }



}
