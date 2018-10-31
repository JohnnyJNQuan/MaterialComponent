import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
	// AppBarProps
	avatar: any;
	backgroundColor?: PropTypes.Color | "transparent"
	color?: PropTypes.Color;
	collection?: Array<any>;
    position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
    // ToolbarProps
    variant?: "regular" | "dense";
    disableGutters?: boolean;
    // Others
    addable?: boolean;
    changed?: boolean;
	editable?: boolean;
	expandable?: boolean;
	expandAll?: boolean;
	filterable?: boolean;
	headline?: any;
	more?: any;
	noBoxShadow?: boolean;
	queryParams?: any;
    searchable?: boolean;
    search?: string;
	subheading?: any;
	title?: any;
	// children slot and view
	slot?: "appbar" | "card" | "list" | "table" | "form"
	view?: string;
	viewList?: Array<string>;
	// actions
	onAccept?(): void;
    onAdd?(): void;
    onCancel?(): void;
	onEdit?(): void;
	onExpand?(): void;
	onSave?(): void;
	onSearch?(): void;
	onUndo?(): void;
	onView?(view: string): any;
}

export interface IState {
	moreExpand: boolean;
}