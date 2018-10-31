import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
    addable?: boolean;
    addItem?: any;
    classes: any;
    editable?: boolean;
    editing?: boolean;
    items: Array<any>;
    itemConfig?: any;
    label: any;
    props?: any;

    fields: any;
    onSave?(item: any): any
}

export interface IState {
    // value: any;
    editing?: boolean;
    controlled?: boolean;
    items: Array<any>;
    props?: any;
}

