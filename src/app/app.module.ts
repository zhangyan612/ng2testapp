import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailGuard } from './products/product-detail.guard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { QuoteComponent } from './quote/quote.component';
import { SignupComponent } from './signup/signup.component';
import { SqlComponent } from './sql/sql.component';
import { InputComponent } from './dynamic-bootstrap/input/input.component';
import { ButtonComponent } from './dynamic-bootstrap/button/button.component';
import { SelectComponent } from './dynamic-bootstrap/select/select.component';
import { DateComponent } from './dynamic-bootstrap/date/date.component';
import { RadiobuttonComponent } from './dynamic-bootstrap/radiobutton/radiobutton.component';
import { CheckboxComponent } from './dynamic-bootstrap/checkbox/checkbox.component';
import { DynamicFieldDirective } from './dynamic-bootstrap/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-bootstrap/dynamic-form/dynamic-form.component';
import { DesignerComponent } from './designer/designer.component';
import { DragulaModule } from 'ng2-dragula';
import { AgGridModule } from 'ag-grid-angular';
import { DataGridComponent } from './data-grid/data-grid.component';
import { SafeHtmlPipe } from './shared/safe-html.pipe';
import { FormsComponent } from './forms/forms.component';
import { TextComponent } from './dynamic-bootstrap/text/text.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    HomeComponent,
    QuoteComponent,
    SignupComponent,
    SqlComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TextComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    DesignerComponent,
    DataGridComponent,
    SafeHtmlPipe,
    FormsComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AgGridModule.withComponents([]),
    DragulaModule.forRoot(),
    RouterModule.forRoot([
      { path: 'forms/:name/:id', component: FormsComponent },
      { path: 'forms/:name', component: FormsComponent },
      { path: 'datagrid', component: DataGridComponent },
      { path: 'designer', component: DesignerComponent },
      { path: 'sql', component: SqlComponent },
      { path: 'quote', component: QuoteComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', 
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: '**', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TextComponent
  ]
})
export class AppModule { }
