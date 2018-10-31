import * as React from 'react';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Paper, Checkbox, IconButton } from '@material-ui/core';
// import Input  from '@material-ui/core/Input';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles/colorManipulator';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./style";
import { IProps, IState } from "./Table.d";
import { TableHead, TableToolbar } from ".";
// import { getSorting, stableSort } from "../utility";

export default withStyles(styles)(
class extends React.Component<IProps, IState> {
  constructor(props: any) {
      super(props);
  }
  

  render() {
    const { classes, expandable, expandAll, selectable } = this.props;
    const { rows, columns, expanded, selected  } = this.props;
    const { onExpand, onExpandAll, onSelect, onSelectAll, onSort } = this.props;
    // const { onChange } = this.props;
    const queryParams = this.props.queryParams || { search: "", filter: {}, sort: {}, page: {}};

    const order = queryParams.sort.order;
    // const orderBy = queryParams.sort.orderBy;
    const pageNumber = queryParams.page.number;
    const pageSize = queryParams.page.size;
    const emptyRows = pageSize - Math.min(pageSize, rows.length - pageNumber * pageSize);
	const numSelected = selected ? selected.length : 0;
	const numColumn = (selectable ? 1 : 0) + columns.length + (expandable ? 1: 0);

    console.log(this.props);
    console.log(this.state);

    return (

      <Paper className={classes.root}>
        <TableToolbar numSelected={numSelected} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead
              numSelected={numSelected}
              order={order}
              orderBy={queryParams.sort.orderBy}
              onSelectAll={onSelectAll}
              onSort={onSort}
              rowCount={rows.length}
              columns={columns}
              expandable={expandable}
              expandAll={expandAll}
              onExpandAll={onExpandAll}
			        className={classes.TableHead}
            />
            <TableBody>
              {
                // stableSort(rows, getSorting(order, orderBy))
                // .slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
                rows && rows.map((row: any, i: number) => {
                  const isSelected = selected && selected.indexOf(i) !== -1;
                  const isExpanded = expanded && expanded.indexOf(i) !== -1;
                  return (
                    <React.Fragment key={i}>
                      <TableRow
                          key={i}
                          hover
                          // onClick={onSelectAll.bind(this, i)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          // selected={isSelected}
                      >
                          <TableCell padding="checkbox" onClick={onSelect.bind(this, i)}>
                              <Checkbox checked={isSelected} />
                          </TableCell>
                          {columns && columns.map((col: any, j: number) => 
                              <TableCell key={j} component="td" scope="row" padding="none">
                                {row[col.id]}
                                  {/* <Input
                                    name={col.id} 
                                    value={row[col.id]} 
                                    onChange={onChange && onChange.bind(this, i, j)} 
                                    disableUnderline
                                    fullWidth
                                  /> */}
                              </TableCell>
                          )}
                          {expandable && (
                            <TableCell padding="checkbox" onClick={onExpand && onExpand.bind(this, i)} style={{width: 36}}>
                              <IconButton color="inherit">
                                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              </IconButton>
                            </TableCell>
                          )}
                      </TableRow>
                      {isExpanded && (
                        <TableRow selected={isExpanded}>
                          <TableCell colSpan={numColumn} >
                              Expand row
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={pageSize}
          page={pageNumber}
          backIconButtonProps={{'aria-label': 'Previous Page' }}
          nextIconButtonProps={{'aria-label': 'Next Page' }}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeSize}
        /> */}
      </Paper>
    );
  }
})

