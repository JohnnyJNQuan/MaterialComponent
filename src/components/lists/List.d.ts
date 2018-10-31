import { WithStyles } from "@material-ui/core/styles";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
    addable?: boolean;
    addTop?: boolean;
    cacheable?: boolean;
    editable?: boolean;
    editAll?: boolean;
    expandable?: boolean;
    expandAll?: boolean;
    header?: boolean;
    pageable?: boolean;
    queryable?: boolean;
    removable?: boolean;
    removeAll?: boolean;
    selectable?: boolean;
    selectAll?: boolean;
    //
    newRow?: any;
    slot?: string;
    columns: Array<any>;
    collection: Array<any>;
    added: Array<number>;
    expanded: Array<number>;
    removed: Array<number>;
	selected: Array<number>;
	updated: Array<number>;
    props: any;
    title?: any;
    headline?: any;
    subheading?: any;
    queryParams?: IQueryParams;

    onExpand?(i: number): void;
    onExpandAll?(): void;
    onSort?(j: number): void;
    // onChange(j: number, event: any): void;
    onChangePage(event: any, page: number): void;
    onChangeSize(event: any): void;
    onSelect(event: any, i: number): any;
    onSelectAll(event: any): void
}

interface IState {
    // editAll: boolean;
    // selectAll: boolean;
    // queryParams: any;
    // added: Array<number>;
    // expanded: Array<number>;
    // editings: Array<number>;
    // removed: Array<number>;
    // selected: Array<number>;
    // updated: Array<number>;
    // collection: Array<any>;
}