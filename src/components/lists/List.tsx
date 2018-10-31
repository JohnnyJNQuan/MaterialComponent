import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List, { ListProps } from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { IProps, IState } from "./List.d";
import styles from "./style";

export default withStyles(styles)(
class extends React.Component<IProps & ListProps & ListItemProps, IState> {
	constructor(props: any) {
		super(props);
		// this.state = { 
		// 	// expanded: false,
		// 	// list: props.list || {}
		// };
	}

    render() {
        const { classes, collection, selected } = this.props;
        const { onSelect } = this.props;

        return (
            <div className={classes.root}>
                <List>
                    {collection.map((item, i) => (
                        <ListItem
                            key={i}
                            role={undefined}
                            dense
                            button
                            onClick={onSelect(event, i)}
                            // className={classes.listItem}
                        >
                        <Checkbox
                            checked={selected.indexOf(i) !== -1}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={`Line item ${i + 1}`} />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Comments">
                                <CommentIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
})

