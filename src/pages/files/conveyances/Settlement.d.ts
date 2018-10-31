import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
	classes: any;
	conveyance: any;
	settlement?: any;
	adjustments?: Array<any>;
	cheques?: Array<any>;
	summary?: any;
	editable: boolean;
	file: any;
	lookups: any;
}

export interface IState {
	editable: boolean;
	editing: any;
	editAll: boolean;
	changed: any;
	errors: any;
	expanded: any;
	expandAll: boolean;
	loading: boolean;
	queryParams: any;
	snackbarOpen: boolean;
	snackbarMessage: any;
	props: any;
	conveyance: any;
	settlement: any;
	adjustments: Array<any>;
	cheques: Array<any>;
	summary: any;
}
