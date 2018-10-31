import { WithStyles } from "@material-ui/core/styles";
import { PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles>{
	actionable?: boolean;
	changed?: boolean;
	color?: PropTypes.Color;
	contents?: Array<any>;
	editable?: boolean;
	editing?: boolean;
	expanded?: boolean;
	headline?: any;
	index?: number;
	removable?: boolean;
	selected: Array<number>;
	slot?: string;
	status?: "add" | "delete" | "update";
	header?: any;
	summary?: boolean;
	subheading?: any
	title: any,
	values: any;
	width?: number;
	onChange?(i: number, event: any): void;
	onEdit?(): void;
	onExpand?(): void;
	onRemove?(): void;
	onSave?(): void;
	onUndo?(): void;
}

export interface IState {
	expanded: boolean;
	values: any;
}