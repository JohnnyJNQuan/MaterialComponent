import { TableProps } from "@material-ui/core/Table";
import { ToolbarProps } from "@material-ui/core/Toolbar";

//
interface IProps  extends TableProps {
    classes: any;
    // TableProps
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
    rows: Array<any>;
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
    onSelect(event: any): void;
    onSelectAll(event: any): void

    // TableHeadProps

    // TableRow

}

interface IState {
    editAll: boolean;
    selectAll: boolean;
    queryParams: any;
    addedIndexes: Array<number>;
    expandedRows: Array<number>;
    editRows: Array<number>;
    removedRows: Array<number>;
    selectedRows: Array<number>;
    updatedRows: Array<number>;
    rows: Array<any>;
}

interface IToolbarProps extends ToolbarProps {
    numSelected: number;
    // classes: any
}

interface ITableHeadProps {
    numSelected: number;
    queryParams: IQueryParams;
    selected: Array<number>;
}

interface ITableHeadState {

}