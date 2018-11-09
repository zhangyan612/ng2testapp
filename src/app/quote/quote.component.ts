import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { DataService } from '../services/data.service'
import { Quote } from '../model/quote';
import { Customer } from '../model/customer';
import { debounceTime } from 'rxjs/operators';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

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


  customerForm: FormGroup;
  customer = new Customer();
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
      //addresses: this.fb.array([this.buildAddress()])
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      //value => this.setNotification(value)
    );
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      emailGroup: { email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com' }
    });
    const addressGroup = this.fb.group({
      addressType: 'work',
      street1: 'Mermaid Quay',
      street2: '',
      city: 'Cardiff Bay',
      state: 'CA',
      zip: ''
    });
    this.customerForm.setControl('addresses', this.fb.array([addressGroup]));
  }

  getData(): void {
    this.dataService.getById('product', 1).subscribe(
      quote => {
          this.quote = quote;
      },
      error => this.errorMessage = <any>error
    );
  }
  
  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

}
