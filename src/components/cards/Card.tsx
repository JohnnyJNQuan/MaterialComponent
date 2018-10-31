import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card, { CardProps } from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UndoIcon from '@material-ui/icons/Undo';
import { getObjectValue } from "../utility";
import styles from "./style";
import { IProps, IState } from "./Card.d";

export default withStyles(styles)(
class extends React.Component<IProps & CardProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = { 
			expanded: false,
			values: props.values || {}
		};
	}

	// toggleEdit = () => {
	// 	this.setState({ editing: !this.state.editing });
	// };

	toggleExpand = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	render() {
		console.log(this.props);

		const { changed, classes, contents, expandContents, editable, editing, index, status, values } = this.props;
		const { onChange, onRemove, onUndo, onEdit } = this.props;
		const title = getObjectValue(this.props.headline, values)
		const subheading = getObjectValue(this.props.subheading, values)
		const avatar = 
			status === "add" ? <AddIcon /> :
			status === "delete" ? <DeleteIcon /> :
			status === "update" ? <UpdateIcon /> : title.substring(0, 1);
		return (
		<Card className={classes.card}>
			<CardHeader
				avatar={<Avatar aria-label="card" className={classes.avatar}>{avatar}</Avatar>}
				action={
					<IconButton>
					<MoreVertIcon />
					</IconButton>
				}
				title={title}
				subheader={subheading}
			/>
			<CardContent>
				{contents && contents.map((content: any, i: number) => {
					return React.cloneElement(content, {
						key: i,
						editable,
						editing,
						values,
						onChange: onChange.bind(this, index)
					});
				})}
			</CardContent>
			<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
				<CardContent>
					{expandContents && expandContents.map((content: any, i: number) => {
						return React.cloneElement(content, {
							key: i,
							editable,
							editing,
							values,
							onChange: onChange.bind(this, index)
						});
					})}
				</CardContent>
			</Collapse>
			<CardActions className={classes.actions} disableActionSpacing>
				{changed && <IconButton aria-label="Undo"><UndoIcon onClick={onUndo} /></IconButton>}
				{editable && <IconButton aria-label="Edit"><UpdateIcon onClick={onEdit} /></IconButton>}
				{editable && <IconButton aria-label="Undo"><DeleteIcon onClick={onRemove} /></IconButton>}
				<IconButton
					className={classnames(classes.expand, { [classes.expandOpen]: this.state.expanded })}
					onClick={this.toggleExpand}
					aria-expanded={this.state.expanded}
					aria-label="Show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
		</Card>
		);
	}
})
