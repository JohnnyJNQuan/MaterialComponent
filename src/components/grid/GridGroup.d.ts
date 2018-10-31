export interface IProps {
    editable?: boolean;
    editing?: boolean;
    errors?: any;
    fields?: Array<any>;
    group?: any;
    values?: any;
    onChange?(i: number): void;
}