
import { FieldConfig } from "../dynamic-bootstrap/fields.interface";
import {  Validators } from '@angular/forms';


export var navLinks : any[] = [
  { text: 'Test', path: '/quote' },
  { text: 'Test Product', path: '/products' },    
  { text: 'Run SQL', path: '/sql' },
  { text: 'Designer', path: '/designer' },
  { text: 'Forms', path: '/forms/test' },
  { text: 'Data Grid', path: '/datagrid' }
]

export const quoteFields: FieldConfig[] = [
    {
      type: "input",
      label: "First Name",
      inputType: "text",
      name: "firstName",
      placeholder:"First Name",
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
      placeholder:"Last Name",
      validations: []
    },
    {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      placeholder:"Email Address",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    {
      type: "input",
      label: "Password",
      inputType: "password",
      name: "password",
      placeholder:"Enter Password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        }
      ]
    },
    {
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female"],
      value: "Male"
    },
    {
      type: "date",
      label: "DOB",
      name: "dob",
      placeholder:"Select date of birth",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date of Birth Required"
        }
      ]
    },
    {
      type: "select",
      label: "Country",
      name: "country",
      value: "US",
      options: ["US", "Canada", "UK", "China"]
    },
    {
      type: "checkbox",
      label: "Accept Terms",
      name: "term",
      value: true
    },
    {
      type: "button",
      label: "Save"
    }
  ];


export const availableFields: FieldConfig[] = [
    {
        type: "text",
        label: "Title",
    },
    {
        type: "input",
        label: "Text",
        inputType: "text",
        name: "text",
        placeholder:"",
        validations: []
    },
    {
      type: "input",
      label: "Line item",
      inputType: "number",
      name: "line",
      placeholder:"",
      validations: []
    },
    {
      type: "input",
      label: "Required Text field",
      inputType: "text",
      name: "RequiredText",
      placeholder:"Required",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Text is Required"
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
      label: "Email Address",
      inputType: "email",
      name: "email",
      placeholder:"Email Address",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    {
      type: "input",
      label: "Password",
      inputType: "password",
      name: "password",
      placeholder:"Enter Password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        }
      ]
    },
    {
      type: "radiobutton",
      label: "Form of organization",
      name: "radio",
      options: ["Corporation", "Trust", "Association", "Other"],
      value: "Corporation"
    },
    {
      type: "date",
      label: "Start Date",
      name: "date",
      placeholder:"Select date",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date is Required"
        }
      ]
    },
    {
      type: "select",
      label: "State",
      name: "select",
      value: "IL",
      options: ["IL", "OH", "AL", "CA"]
    },
    {
      type: "checkbox",
      label: "Self-employed?",
      name: "checkbox",
      value: true
    },
    {
      type: "button",
      label: "Save"
    }
  ];


export class fieldsConfig{

}