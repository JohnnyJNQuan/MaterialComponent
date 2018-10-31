import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
    editable: boolean;
    editing: boolean;
    inputRef: any;
    label: any;
    classes: any;
}

export interface IState {
    editing?: boolean;
    single?: any;
    multi?: any;
}

