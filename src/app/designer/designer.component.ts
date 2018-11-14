import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../dynamic-bootstrap/fields.interface';

let elementId = 0;

class WebElement {
  id: number;
  name: string;
  html: string;
  icon: string;
  constructor(name: string, template: string, icon:string, public args: any) {
    this.id = elementId++;
    this.name = name;
    this.html = this.populateHTML(template, args);
    this.icon = 'fa ' + icon + ' fa-2k';
  
  }

  
  populateHTML(template: string, args: any): string {

    let html = `<b>v${args.lebal}</b>`;

    return html;
  }
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
  // availables = [
  //   new WebElement('Title', '<b>{{args.lebal}}</b>','fa-text-width', {lebal: 'test title'}),  //[new ElementProperty('lebal', 'test title')]
  //   new WebElement('Button', '<button type="button" class="btn btn-primary">Primary</button>', 'fa-square',  {lebal: 'test title'}),
  //   new WebElement('Text Field', '<div class="form-group"> <label for="textfield">New Field</label> <input type="text" class="form-control" id="textfield" placeholder="some text"> </div>', 'fa-pencil-square-o', {lebal: 'test title'}),
  //   new WebElement('Select', '<div class="form-group"> <label for="exampleFormControlSelect1">Example select</label> <select class="form-control" id="exampleFormControlSelect1"> <option>1</option> <option>2</option> <option>3</option> </select> </div>', 'fa-bars', {lebal: 'test title'}),
  //   new WebElement('Checkboxes', '<div class="custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input" id="customCheck1"> <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label> </div>','fa-check-square', {lebal: 'test title'}),
  //   new WebElement('Star', '<pm-star [rating]=product.starRating></pm-star>','fa-text-width', {lebal: 'test title'}),  //[new ElementProperty('lebal', 'test title')]

  // ];
  generated = [
    new WebElement('Title', '<b>New Form</b>', 'fa-text-width', {lebal: 'test title'}),
  ];
  currentElement: FieldConfig;

  availables: FieldConfig[] = [
    {
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
    },
    {
      type: "input",
      label: "Last Name",
      inputType: "text",
      name: "lastName",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Last Name is Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    }
  ]


  constructor(private dragulaService: DragulaService) {

    dragulaService.createGroup('formBuilder', {
      copy: (el, source) => {
        return source.id === 'left';
      },
      // copyItem: (element: WebElement) => {
      //   return new WebElement(element.name, element.html, element.icon, element.args);
      // },
      copyItem: (element: FieldConfig) => {
        return element;
      },

      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'left';
      }
    });
    
    this.dragulaService.dropModel("formBuilder").subscribe(args => {
      console.log(args);
      //this.onDrop(args);
    });
  }

  public onclick(item: any) {
    console.log(item)
    this.currentElement = item;
  }

//   private onDrop(value) {
//     console.log(value)
//     if (value == null) //dragged outside any of the bags
//         return;
//     if (value.target.id !== "generated") //dragged to a container that should not add the element
//         value.remove();
// }
  
  public groups:Array<any> = [
    {
      name: 'Group A',
      items: [{name: 'Button', html:'<button type="button" class="btn btn-primary">Primary</button>'}, {name: 'Item B', html:''}, {name: 'Item C', html:''}, {name: 'Item D', html:''}]
    },
    {
      name: 'Group B',
      items: [{name: 'Item 1'}, {name: '<b>test bold</b>'}, {name: 'Item 3'}, {name: 'Item 4'}]
    },
    {
      name: 'Group C',
      items: [{name: 'Item C'}, {name: 'normal'}, {name: 'Item 3'}, {name: 'Item 4'}]
    }
  ];


  ngOnInit() {
  }

  addComponent(): void{
    //this.subs.add()
  }

}
