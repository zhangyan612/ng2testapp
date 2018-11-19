import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../dynamic-bootstrap/fields.interface';
import { availableFields } from '../shared/fields-config';
import { FormDefinition } from '../model/form-definition';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  formPath: string;
  formId : number;

  errorMessage: string;
  form: FormGroup;
  formDefination : FormDefinition
  = { formName:'', formPath:'', fields:[] } as FormDefinition
  sideBar = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private dataService: DataService, private fb: FormBuilder) 
  { 
    this.formPath = this.route.snapshot.paramMap.get('name');
    //this.formDataId = this.route.snapshot.paramMap.get('name');

    // this.dataService.getFilter('forms','formPath', this.formPath).subscribe(
    //   f => {
    //     this.formDefination = f[0];
    //     this.form = this.createControl(this.formDefination.fields);
    //   },
    //   error => this.errorMessage = <any>error
    // );

    router.events.subscribe((val) => {
      // see also       
      //console.log('route changed ' + val) 
      if(val instanceof NavigationEnd){

        this.formPath = this.route.snapshot.paramMap.get('name');
        var id = this.route.snapshot.paramMap.get('id');

        console.log('route changed to:' + this.formPath)
      
  
        var getFormDefination = new Promise((resolve, reject) => {
          this.dataService.getFilter('forms','formPath', this.formPath)
              .subscribe(data => {
                resolve(data);
              }, error => reject(error));
        });
        
        getFormDefination.then(response => {
          this.formDefination = response[0];
          this.form = this.createControl(this.formDefination.fields);

          this.form.valueChanges.pipe(
            debounceTime(1000))
            .subscribe(val => {
              this.valueChangedWatcher(val);
          });
        })

      }
    });


  }

  ngOnInit() {
    // debugger
    this.form = this.createControl(this.formDefination.fields);

    this.dataService.getAll('sideBar').subscribe(
      f => {
        this.sideBar = f;
      },
      error => this.errorMessage = <any>error
    );

  }

  valueChangedWatcher(formData) {
    console.log(formData);
    if(formData.line4){
      formData.line5 = +formData.line4 + 1000;
      this.form.setValue(formData);
    }
  }
  
  // ngOnChange(){
  //   console.log('ngOnChange');
  //   debugger
  // }

  saveForm() {
    console.log('saveForm');
    console.log(this.formPath);
    console.log(this.form.value);

  }

  onSubmit(event: Event) {
    console.log(event);
    debugger
    event.preventDefault();
    event.stopPropagation();
  }

  createControl(fieldsConfig) {
    //debugger
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
