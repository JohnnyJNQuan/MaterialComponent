import { RadioGroupProps } from "@material-ui/core/RadioGroup";
import { FormGroupProps, FormGroupClassKey } from "@material-ui/core/FormGroup";
import { WithStyles } from '@material-ui/core/styles';
import styles from "./style";

interface IProps extends WithStyles<typeof styles> {
    classes: any;
    className: string;
    editable?: boolean;
    editing?: boolean;
    items: Array<any>;
    itemConfig?: any;
    label: any;
    helperText: any;
    name: string;
    value?: any
    row?: boolean
    onChange?(event: any, value: any): void;
}

export interface IState {
    editing?: boolean;
    // controlled?: boolean;
}
