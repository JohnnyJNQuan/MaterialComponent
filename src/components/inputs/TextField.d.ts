import { WithStyles } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
	adornment?: any;
	adornmentPosition?: "start" | "end";
    editable?: boolean;
    editing?: boolean;
	label: any;
}

export interface IState {
	controlled: boolean;
	editing?: boolean;
}
