import * as React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, Tooltip, IconButton } from "@material-ui/core";
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import styles from "./style";
// import { IToolbarProps } from "./Table.d";

export default withStyles(styles)((props: any) => {
    
    const { numSelected, classes } = props;
  
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography
             color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              Filters
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
});