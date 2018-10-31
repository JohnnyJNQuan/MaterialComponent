import * as React from "react";
// import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import UpdateIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import styles from "./style";
import { IProps, IState } from "./Form.d";
import { getObjectValue } from "../utility";
import { ConfirmButton } from "../buttons";

export default withStyles(styles)(
class extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = { 
			expanded: false,
			values: props.values || {}
		};
	}

	toggleExpand = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	render() {
		// console.log(this.props);
		const { actionable, classes, color, contents, editable, editing, changed, expanded, 
			removable, status, values, title, headline, subheading, width, header } = this.props;
		const { onChange, onEdit, onExpand, onRemove, onSave, onUndo } = this.props;

		// const title = getObjectValue(this.props.title, values)
		// const headline = getObjectValue(this.props.headline, values)
		// const subheading = getObjectValue(this.props.subheading, values)
		const avatar = 
			status === "add" ? <AddIcon /> :
			status === "delete" ? <DeleteIcon /> :
			status === "update" ? <UpdateIcon /> : "";
			// title ? title.substring(0, 1) : "";
		const widthStyle = width ? { width: `${width}px` } : { width: "100%"};
		
		return (
			<ExpansionPanel expanded={expanded} onChange={onExpand} className={classes.root} style={widthStyle}>
				{(title || headline || subheading ) &&
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panelSummary}>
						<Avatar className={classes.panelAvatar} >{avatar}</Avatar>
						<Typography variant="title" color={color} className={classes.title}>
							{getObjectValue(title, values)}
						</Typography>
						<Typography color="textSecondary" className={classes.heading}>
							{getObjectValue(headline, values)}
						</Typography>
						<Typography color="textSecondary" className={classes.secondaryHeading}>
							{getObjectValue(subheading, values)}
						</Typography>
					</ExpansionPanelSummary>
					
				}
				{header && 
					<ExpansionPanelDetails className={classes.panelHeader}>
						{header}
					</ExpansionPanelDetails>
				}
				{contents && 
					<ExpansionPanelDetails className={classes.panelDetails}>
						{contents && contents.map((content: any, i: number) => {
							return React.cloneElement(content, {
								key: i,
								changed,
								editable,
								editing,
								values,
								onChange,
							});
						})}
					</ExpansionPanelDetails>
				}
				<Divider light />
				{ actionable && changed && editable && 
					<ExpansionPanelActions>
						{changed && onSave && <Button color="primary" onClick={onSave} >Save</Button>}
						{changed && onUndo && 
							// <Button color="inherit" onClick={onUndo} >Undo</Button>
							<ConfirmButton
								variant="text"
								color="secondary"
								text="Undo"
								message="Undo the changes?"
								onYes={onUndo}
							/>
						}
						{editable && onEdit && <Button color="inherit" onClick={onEdit} >Edit</Button>}
						{removable && onRemove && <Button color="inherit" onClick={onRemove} >Delete</Button>}
					</ExpansionPanelActions>
				}
			</ExpansionPanel>
		);
	}
})
