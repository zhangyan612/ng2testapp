import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '../dynamic-bootstrap/fields.interface';
import { DataService } from '../services/data.service';
import { FormDefinition } from '../model/form-definition';
import { Router } from '@angular/router';

let elementId = 1;

class WebElement {
  id: number;
  name: string;
  html: string;
  icon: string;
  constructor(id: number, name: string, template: string, icon:string, public args: any) {
    this.id = id
    this.name = name;
    // this.html = this.populateHTML(template, args);
    this.icon = 'fa ' + icon + ' fa-2k';
  
  }

  // populateHTML(template: string, args: any): string {
  //   let html = `<b>v${args.lebal}</b>`;
  //   return html;
  // }
}

class ElementProperty {
  name: string;
  value: string;
  constructor(name: string, value: string){
    this.name = name;
    this.value = value;
  }
}

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  formDefination : FormDefinition
  = { formName:'', formPath:'', fields:[] } as FormDefinition

  // fields: FieldConfig[] = [
  //   {
  //     id: 1,
  //     type: "input",
  //     label: "Sample Text",
  //     inputType: "text",
  //     name: "Line1",
  //     placeholder:"please input text",
  //     validations: [
  //       {
  //         name: "required",
  //         validator: Validators.required,
  //         message: "Text Required"
  //       }
  //     ]
  //   }
  // ];

  // get controls() { return this.fields.filter(({type}) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }


  submit: EventEmitter<any> = new EventEmitter<any>();

  availables = [
    new WebElement(0,'Title', '<b>{{args.lebal}}</b>','fa-text-width', {lebal: 'test title'}),  //[new ElementProperty('lebal', 'test title')]
    new WebElement(1, 'Text Field', '<div class="form-group"> <label for="textfield">New Field</label> <input type="text" class="form-control" id="textfield" placeholder="some text"> </div>', 'fa-pencil-square-o', {lebal: 'test title'}),
    new WebElement(2, 'Number Field', '', 'fa-pencil-square-o', {lebal: 'Line 1'}),
    new WebElement(6, 'Radio Button', '','fa-text-width', {lebal: 'test title'}), 
    new WebElement(7, 'Date', '','fa-text-width', {lebal: 'test title'}), 
    new WebElement(8, 'Select', '<div class="form-group"> <label for="exampleFormControlSelect1">Example select</label> <select class="form-control" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> </select> </div>', 'fa-bars', {lebal: 'test title'}),
    new WebElement(9,'Checkboxes', '<div class="custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input" id="customCheck1"> <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label> </div>','fa-check-square', {lebal: 'test title'}),
    new WebElement(10, 'Button', '<button type="button" class="btn btn-primary">Primary</button>', 'fa-square',  {lebal: 'test title'}),
  ];

  selected: FieldConfig;
  regConfig: FieldConfig[] = []

  availableFields :FieldConfig[] = []

  constructor(private dragulaService: DragulaService, private router: Router,
    private fb: FormBuilder, private dataService: DataService) {
      //this.formDefination.Fields = availableFields;

    // dragulaService.createGroup('formBuilder', {
    //   copy: (el, source) => {
    //     return source.id === 'left';
    //   },
    //   // copyItem: (element: WebElement) => {
    //   //   return new WebElement(element.name, element.html, element.icon, element.args);
    //   // },
    //   copyItem: (element: FieldConfig) => {
    //     return element;
    //   },

    //   accepts: (el, target, source, sibling) => {
    //     // To avoid dragging from right to left container
    //     return target.id !== 'left';
    //   }
    // });
    
    // this.dragulaService.dropModel("formBuilder").subscribe(args => {
    //   console.log(args);
    //   //this.onDrop(args);
    // });
    this.dataService.getAll('fields').subscribe(
      f => {
        this.availableFields = f;
      },
      error => this.errorMessage = <any>error
    );
  }

  // public onclick(item: any) {
  //   console.log(item)
  //   this.currentElement = item;
  // }

//   private onDrop(value) {
//     console.log(value)
//     if (value == null) //dragged outside any of the bags
//         return;
//     if (value.target.id !== "generated") //dragged to a container that should not add the element
//         value.remove();
// }
  
  // public groups:Array<any> = [
  //   {
  //     name: 'Group A',
  //     items: [{name: 'Button', html:'<button type="button" class="btn btn-primary">Primary</button>'}, {name: 'Item B', html:''}, {name: 'Item C', html:''}, {name: 'Item D', html:''}]
  //   },
  //   {
  //     name: 'Group B',
  //     items: [{name: 'Item 1'}, {name: '<b>test bold</b>'}, {name: 'Item 3'}, {name: 'Item 4'}]
  //   },
  //   {
  //     name: 'Group C',
  //     items: [{name: 'Item C'}, {name: 'normal'}, {name: 'Item 3'}, {name: 'Item 4'}]
  //   }
  // ];

  addTextField(id: number): void {
    let config = {...this.availableFields[id]};
    //let config = availableFields[id];
    elementId++;
    config.name = config.name+elementId;
    console.log(config);
    this.formDefination.fields.push(config);
    this.form = this.createControl();
    console.log(this.form);
  }

  onFormNameChange(event){
    // console.log(event.target.value);
    // console.log(this.selected.name);
    // console.log(this.form.controls[this.selected.name]);

    // const existing = th  is.form.controls[this.selected.name];
    // this.form.setControl(event.target.value, existing);

    // console.log(this.form);

    //this.selected.name = 
  }

  selectedFields() {
    let lst = [];
    let objs = this.formDefination.fields;

    for (var property in objs) {
      if (objs.hasOwnProperty(property)) {
        if(objs[property].name){
          //console.log(objs[property].name + ': ' + objs[property].label)
          lst.push({name: objs[property].name, label: objs[property].label});
        }
      }
    }
    return lst;
  }


  onOptionChange($event, i) {
    var value = $event.target.value;
    
    // not remove for now
    // if(!value){
    //   this.selected.options = this.selected.options.splice(i, 1);
    // }else{
    //   this.selected.options[i] = value;
    // }

    this.selected.options[i] = value;

  }

  addMoreOption(){
    this.selected.options.push('');
  }

  // ngOnChanges() {
  //   if (this.form) {
  //     const controls = Object.keys(this.form.controls);
  //     const configControls = this.controls.map((item) => item.name);

  //     controls
  //       .filter((control) => !configControls.includes(control))
  //       .forEach((control) => this.form.removeControl(control));

  //     this.form = this.createControl();
  //     // configControls
  //     //   .filter((control) => !controls.includes(control));
  //       // .forEach((name) => {
  //       //   const config = this.fields.find((control) => control.name === name);
  //       //   this.form.addControl(name, this.createControl());
  //       // });      
  //   }
  // }
  
  onSubmit(event: Event) {
    console.log(event);
    debugger
    event.preventDefault();
    event.stopPropagation();
    // if (this.form.valid) {
    //   this.submit.emit(this.form.value);
    // } else {
    //   this.validateAllFormFields(this.form);
    // }
  }

  ngOnInit() {

    this.form = this.createControl();
  }

  createControl() {
    console.log('creating controls')
    const group = this.fb.group({});
    this.formDefination.fields.forEach(field => {
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

  // printCurrent(){
  //   console.log(this.regConfig);
  // }

  loadField(data): void {
    console.log(data);
    this.selected = data;
  }

  saveForm(): void{
    console.log(this.formDefination);

    var saveOperation = new Promise((resolve, reject) => {
      this.dataService.create('forms', this.formDefination)
          .subscribe(data => {
            resolve(data);
          }, error => reject(error));

      this.dataService.create('sideBar', {name: this.formDefination.formName, url: this.formDefination.formPath})
        .subscribe(data => {
          resolve(data);
        }, error => reject(error));
      
    });


    saveOperation.then(
      response => console.log(response)
    ).then(
      response => this.router.navigate(['/forms/' + this.formDefination.formPath])
    )


  }

}
