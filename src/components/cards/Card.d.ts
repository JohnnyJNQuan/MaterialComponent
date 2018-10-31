import { WithStyles } from "@material-ui/core/styles";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles>{
	changed?: boolean;
	contents?: Array<any>;
	expandContents?: Array<any>;
	editable?: boolean;
	editing?: boolean;
	expanded?: boolean;
	headline?: any;
	index?: number;
	selected: Array<number>;
	slot?: string;
	status?: "add" | "delete" | "update";
	subheading?: any
	title: any,
	values: any;
	onChange(i: number, event: any): void;
	onExpand(): void;
	onRemove(): void;
	onUndo(): void;
	onEdit(): void;
}

export interface IState {
	expanded: boolean;
	values: any;
}