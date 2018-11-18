import { FieldConfig } from "../dynamic-bootstrap/fields.interface";

export interface FormDefinition {
    formName: string;
    formPath: string;
    fields: FieldConfig[];
}