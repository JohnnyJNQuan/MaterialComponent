export interface IProps {
	adornment?: any;
	adornmentPosition?: "start" | "end";
    classes: any;
    editable?: boolean;
    editing?: boolean;
    error?: boolean;
    errorText?: any;
    field: any;
    fullWidth?: boolean;
	value: any;		// field value
	values: any;	// model values
    onChange?(i: number): void;
}
