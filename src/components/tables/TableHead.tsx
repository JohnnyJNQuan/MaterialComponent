import * as React from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";
import { Checkbox, Tooltip, IconButton } from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class extends React.Component<any, any> {
    createSortHandler = (property: any) => (event: any) => {
        this.props.onRequestSort(event, property);
    };
    
    render() {
        const { expandable, expandAll, columns, onSelectAll, order, orderBy, numSelected, columnCount } = this.props;
        const { onExpandAll } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < columnCount}
                            checked={numSelected === columnCount}
                            onChange={onSelectAll}
                        />
                    </TableCell>
                    {columns && columns.map((col: any) => {
                        return (
                            <TableCell
                                key={col.id}
                                numeric={col.numeric}
                                padding={col.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === col.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={col.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === col.id}
                                        direction={order}
                                        onClick={this.createSortHandler(col.id)}
                                    >
                                        {col.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    {expandable && (
                    <TableCell padding="checkbox" onClick={onExpandAll}>
                        <IconButton color="inherit">
                            {expandAll ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        </IconButton>
                    </TableCell>
                    )}

                </TableRow>
            </TableHead>
        );
    }
}