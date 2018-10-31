import { WithStyles, createStyles } from '@material-ui/core';
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
	// AppBarProps
	addable?: boolean;
	addToFirst?: boolean;
	changed?: boolean;
	// color?: PropTypes.Color;
	collection: Array<any>;
	editable?: boolean;
	editAll?: boolean;
	expandable?: boolean;
	expandAll?: boolean;
	newItem?: any;
	initialCollection?: any;
	queryParams?: IQueryParams;
	searchable?: boolean;
	selectable?: boolean;
	title?: any;
	headline?: any;
	subheading?: any;
	view: "card" | "list" | "table" | "form"
	viewList?: Array<string>;
	// onAdd?(item: any): any;
	onChange?(arr: Array<any>): void;
	// onChangeAll?(collection: Array<any>): void;
	onEdit?(): void;
	onExpand?(): void;
	onQuery?(params: IQueryParams): void;
	// onRemove?(i: number): void;
	onSave?(arr: Array<any>): void;
	// onSaveAll?(collection: Array<any>): void;
	// onUndo?(i: number): void;
	// onUndoAll?(): void;
}

export interface IState {
	added: Array<number>;
	collection: Array<any>;
	editAll: boolean;
	editings: Array<number>  
	expanded: Array<number>;
	expandAll: boolean;
	props?: any;
	removed: Array<number>;
	selectAll: boolean;
	selected: Array<number>;
	updated: Array<number>;
	queryParams?: IQueryParams;
	view: string;
	controlled?: boolean;
}

export interface IQueryParams {
	search?: string;
	filter?: any;
	sort?: any;
	page?: any;
}

