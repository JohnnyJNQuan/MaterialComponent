import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
    classes: any;
    editable?: boolean;
    editing?: boolean;
    items: Array<any>;
    itemConfig?: any;
    label: any;
    props?: any;
}

export interface IState {
	controlled: boolean;
    editing?: boolean;
    checked: boolean;
}

