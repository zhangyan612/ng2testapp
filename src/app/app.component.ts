import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Form App';
  logoTxt : string = "Form App";
  links = [
    { text: 'Quote', path: '/quote' },
    { text: 'Product List', path: '/products' },    
    { text: 'Run SQL', path: '/sql' },
    { text: 'Designer', path: '/designer' },
    { text: 'Data Grid', path: '/datagrid' }
  ]
}
