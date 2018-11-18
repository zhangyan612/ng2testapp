import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../dynamic-bootstrap/fields.interface';
import { availableFields } from '../shared/fields-config';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  formName: string;
  errorMessage: string;
  fields: FieldConfig[] = [];
  form: FormGroup;

  constructor(private route: ActivatedRoute, private dataService: DataService, private fb: FormBuilder) 
  { 
    this.formName = this.route.snapshot.paramMap.get('name');

    this.dataService.getAll('fields').subscribe(
      f => {
        this.fields = f;
        this.form = this.createControl(f);
      },
      error => this.errorMessage = <any>error
    );
  }

  ngOnInit() {
    //this.fields = availableFields;
    this.form = this.createControl(this.fields);
    
  }

  onSubmit(event: Event) {
    console.log(event);
    debugger
    event.preventDefault();
    event.stopPropagation();
  }

  createControl(fieldsConfig) {
    console.log('creating controls')
    const group = this.fb.group({});
    fieldsConfig.forEach(field => {
      if (field.type === "button" || field.type === "text") return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      console.log(control)
      control.markAsTouched({ onlySelf: true });
    });
  }

}
