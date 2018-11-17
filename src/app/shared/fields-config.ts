
import { FieldConfig } from "../dynamic-bootstrap/fields.interface";
import {  Validators } from '@angular/forms';


export var navLinks : any[] = [
  { text: 'Quote', path: '/quote' },
  { text: 'Product List', path: '/products' },    
  { text: 'Run SQL', path: '/sql' },
  { text: 'Designer', path: '/designer' },
  { text: 'Forms', path: '/forms/form990' },
  { text: 'Data Grid', path: '/datagrid' }
]

export const quoteFields: FieldConfig[] = [
    {
      id: 1,
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
      id: 2,
      type: "input",
      label: "Last Name",
      inputType: "text",
      name: "lastName",
      placeholder:"Last Name",
      validations: []
    },
    {
      id: 3,
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
      id: 4,
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
      id: 5,
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female"],
      value: "Male"
    },
    {
      id: 6,
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
      id: 7,
      type: "select",
      label: "Country",
      name: "country",
      value: "US",
      options: ["US", "Canada", "UK", "China"]
    },
    {
      id: 8,
      type: "checkbox",
      label: "Accept Terms",
      name: "term",
      value: true
    },
    {
      id: 9,
      type: "button",
      label: "Save"
    }
  ];


export const availableFields: FieldConfig[] = [
    {
        id: 1,
        type: "input",
        label: "Text",
        inputType: "text",
        name: "Line",
        placeholder:"",
        validations: []
    },
    {
      id: 2,
      type: "input",
      label: "Text field with validation",
      inputType: "text",
      name: "textvalid",
      placeholder:"text with validation",
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
      id: 3,
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
      id: 4,
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
      id: 5,
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female"],
      value: "Male"
    },
    {
      id: 6,
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
      id: 7,
      type: "select",
      label: "Country",
      name: "country",
      value: "US",
      options: ["US", "Canada", "UK", "China"]
    },
    {
      id: 8,
      type: "checkbox",
      label: "Accept Terms",
      name: "term",
      value: true
    },
    {
      id: 9,
      type: "button",
      label: "Save"
    }
  ];


export class fieldsConfig{

}