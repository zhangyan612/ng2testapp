import { FieldConfig } from "../dynamic-bootstrap/fields.interface";

export interface FormDefinition {
    id?: number;
    formName: string;
    formPath: string;
    fields: FieldConfig[];
}