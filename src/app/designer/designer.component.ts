import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

let personId = 0;

class Person {
  id: number;
  constructor(public name: string) {
    this.id = personId++;
  }
}



const nestedExampleCode = `
<div class="wrapper" dragula="COLUMNS" [(dragulaModel)]="groups">
    <div class="container" *ngFor="let group of groups">
      <span class="group-handle">{{group.name}}</span>
      <div class="container" dragula="ITEMS" [(dragulaModel)]="group.items">
        <div *ngFor="let item of group.items" [innerHtml]="item.name"></div>
      </div>
    </div>
</div>
export class NestedComponent {
  constructor(private dragulaService: DragulaService) {
    this.dragulaService.createGroup("COLUMNS", {
      direction: 'horizontal',
      moves: (el, source, handle) => handle.className === "group-handle"
    });
  }
  public groups:Array<any> = [
    {
      name: 'Group A',
      items: [{name: 'Item A'}, {name: 'Item B'}, {name: 'Item C'}, {name: 'Item D'}]
    },
    {
      name: 'Group B',
      items: [{name: 'Item 1'}, {name: 'Item 2'}, {name: 'Item 3'}, {name: 'Item 4'}]
    }
  ];
}
`;



@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {
  left = [
    new Person('Yan'),
    new Person('Diana'),
    new Person('Persephone'),
    new Person('Jacob'),
  ];
  right = [
    new Person('Delia'),
    new Person('Jackson'),
  ];
  BAG = "DRAGULA_EVENTS";
  subs = new Subscription();

  code = nestedExampleCode;

  constructor(private dragulaService: DragulaService) {
    this.dragulaService.createGroup("nestedGroup", {
      direction: 'horizontal',
      moves: (el, source, handle) => handle.className === "group-handle"
    });
  }

  public groups:Array<any> = [
    {
      name: 'Group A',
      items: [{name: 'Item A'}, {name: 'Item B'}, {name: 'Item C'}, {name: 'Item D'}]
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



}
