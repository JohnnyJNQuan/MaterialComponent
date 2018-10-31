import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
	checked: boolean;
    editable: boolean;
    editing: boolean;
    inputRef: any;
    label: any;
}

export interface IState {
	controlled: boolean;
    editing?: boolean;
    checked: boolean;
}

