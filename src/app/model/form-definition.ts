import { FieldConfig } from "../dynamic-bootstrap/fields.interface";

export interface FormDefinition {
    FormName: string;
    FormPath: string;
    Fields: FieldConfig[];
}