import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../dynamic-bootstrap/fields.interface';
import { availableFields } from '../shared/fields-config';
import { FormDefinition } from '../model/form-definition';
import { debounceTime } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

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
  existing: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private dataService: DataService, private fb: FormBuilder, private alertService: AlertService)
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
      if(val instanceof NavigationEnd) {

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

          if(id){

            this.dataService.getById(this.formDefination.formPath, +id)
              .subscribe(data => {
                if(data.length > 0) {
                  this.formId = data[0].id;
                  delete data[0].id;
                  this.form.setValue(data[0]);
                  this.existing = true;
                }
              }, error => this.errorMessage = <any>error);

          }
          //this.form.get()
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

  
  valueChangedWatcher(data) {
    // can attach additional calculation logic
    if(data.line4) {
      data.line5 = +data.line4 + 1000;
      this.form.setValue(data, { emitEvent: false });
    }
    console.log(data);
  }
  
  saveForm() {
    console.log('saveForm');
    console.log(this.formPath);
    console.log(this.form.value);
    console.log(this.formId);
    // if form exist, update
    // otherwise save
    //debugger
    // if(this.existing){
    //   console.log('Updating record')
    //   this.dataService.update(this.formPath, this.form.value).subscribe(
    //     response => {
    //       console.log(response)
    //       this.alertService.success("Form is updated");
    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //       this.alertService.error(error);
    //     }
    //   );
    // }else{
      // save the form
      if(this.existing) {
        console.log('Updating record')
        this.dataService.update(this.formPath, this.formId, this.form.value).subscribe(
          response => {
            console.log(response)
            this.alertService.success("Form is updated");
          },
          error => {
            this.errorMessage = <any>error;
            this.alertService.error(error);
          }
        );
      }
      else {
        console.log('Creating record')

        this.dataService.create(this.formPath, this.form.value).subscribe(
          response => {
            console.log(response)
            this.alertService.success("Form is saved");
          },
          error => {
            this.errorMessage = <any>error;
            this.alertService.error(error);
          }
        );
  
      }

    // }
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
