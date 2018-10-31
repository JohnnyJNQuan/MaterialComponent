import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
	classes: any;
	conditions: Array<any>;
	conveyance: any;
	editable: boolean;
	file: any;
	lookups: any;
	property: any;
	propertyLots: Array<any>;
	relationships: Array<any>;
	// conveyanceAction: typeof conveyanceActions;
	// fileAction: typeof fileActions;
	// lookupAction: typeof lookupActions;
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
	clients: Array<any>;
	conveyance: any;
	conditions: Array<any>;
	otherparties: Array<any>;
	othersides: Array<any>;
	property: any;
	propertyLots: Array<any>;
	relationships: Array<any>;
	props: any;
}
