export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface Condition {
  show: string;
  when: boolean;
  equal: string;
}


export interface FieldConfig {
    id?: number;
    label?: string;
    name?: string;
    inputType?: string;
    placeholder?: string;
    options?: string[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
    condition?: Condition;
    mode?: string;
  }
  