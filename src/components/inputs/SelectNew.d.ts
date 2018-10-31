import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
    classes: any;
    fields: any;
    onSave: any;
}

export interface IState {
    values: any;
}

