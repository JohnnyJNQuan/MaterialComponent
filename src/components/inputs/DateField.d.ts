import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
    editable?: boolean;
    editing?: boolean;
    label: any;
    onChange?(event: any, dateValue: any): void
}

export interface IState {
	controlled: boolean;
    editing?: boolean;
    value: string;
}
