import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.css']
})
export class SqlComponent implements OnInit {
  name : string ='';
  errorMessage: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getData(): void {
    
    this.dataService.getById('product', 1).subscribe(
      name => {
          this.name = name;
      },
      error => this.errorMessage = <any>error
    );
  }

}
