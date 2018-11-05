import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
import { Quote } from '../model/quote';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quote: Quote = { firstName:'Yan', lastName:'Zhang' } as Quote;

  errorMessage: string;
  eff: Date;
  languages: string[] = ['English', 'Spanish', 'Chinese']

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getData(): void {
    this.dataService.getById('product', 1).subscribe(
      quote => {
          this.quote = quote;
      },
      error => this.errorMessage = <any>error
    );
  }

  toUpperCase(value: string): void{
    if(value.length > 0){
      this.quote.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    }else{
      this.quote.firstName = value;
    }
  }

}
