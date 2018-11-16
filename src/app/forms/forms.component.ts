import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  formName: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.formName = this.route.snapshot.paramMap.get('name');

  }

}
