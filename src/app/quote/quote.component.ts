import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { DataService } from '../services/data.service'
import { Quote } from '../model/quote';
import { Customer } from '../model/customer';
import { debounceTime } from 'rxjs/operators';
import { DynamicFormComponent } from '../dynamic-bootstrap/dynamic-form/dynamic-form.component';
import { FieldConfig } from "../dynamic-bootstrap/fields.interface";
import { quoteFields } from '../shared/fields-config';

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

  constructor(private dataService: DataService, private fb: FormBuilder) {

  }

  regConfig: FieldConfig[] = quoteFields;
  

  ngOnInit() {
    // this.customerForm.get('notification').valueChanges.subscribe(
    //   //value => this.setNotification(value)
    // );
  }

  getData(): void {
    // this.dataService.getById('product', 1).subscribe(
    //   quote => {
    //       this.quote = quote;
    //   },
    //   error => this.errorMessage = <any>error
    // );
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

  addTextField(id: number): void {
    let config = quoteFields[id];
    // config.name= config.name+elementId;
    console.log(this.form);

    console.log(config);

    // const control = this.fb.control(
    //   config,
    //   this.bindValidations(config.validations || [])
    // );
    // this.form.addControl(config.name, control);
    
    this.regConfig.push(config);
  }

  addConfig(data: FieldConfig[] ) {

    let additional = {
      type: "input",
      label: "First Name",
      inputType: "text",
      name: "firstName",
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

}
