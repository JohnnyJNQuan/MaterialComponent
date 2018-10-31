import * as React from "react";
import classnames from "classnames";
import { AppBar, Avatar, Collapse, IconButton, Input, Paper, Toolbar, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import UndoIcon from "@material-ui/icons/Undo";
import ListIcon from "@material-ui/icons/List";
import CardIcon from "@material-ui/icons/ViewModule";
import TableIcon from "@material-ui/icons/GridOn";
import FormIcon from "@material-ui/icons/Payment";
import FilterListIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";
import { IProps, IState } from "./AppBar.d";
import { AppBarProps } from "@material-ui/core/AppBar";
import { ConfirmButton } from "../buttons";

export default withStyles(styles)(
class extends React.Component<IProps & AppBarProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			moreExpand: props.moreExpand || false
		};
	}

	toggleFilterExpand = () => this.setState({ moreExpand: !this.state.moreExpand });

	render() {
		const {
			addable, changed, editable, expandable, expandAll, classes, filterable, searchable,
			color, headline, more, noBoxShadow, subheading, title, view,
			onAdd, onEdit, onExpand, onSearch, onSave, onUndo, onView,
			collection
		} = this.props;
		const queryParams = this.props.queryParams || {
			search: "",
			filter: {},
			sort: {},
			page: {}
		};
		// remove default from view list
		const viewList = Object.assign([], this.props.viewList);
		const p = viewList.findIndex((v: any) => v === view);
		if (p !== -1) {
			viewList.splice(p, 1);
		}
		const boxShadow = noBoxShadow ? classes.noBoxShadow : {};

		return (
			<AppBar position={this.props.position || "static"} color="inherit" className={classnames(classes.root, boxShadow)} >
				<Toolbar variant={this.props.variant || "regular"} className={classes.denseToolbar}>
					{collection && <Avatar className={classes.avatar}>{collection.length || "0"}</Avatar>}
					{title && <Typography className={classes.title} variant="title" color={color} noWrap>
						{title}
					</Typography>}
					{headline && <Typography className={classes.headline} variant="title" color={color} noWrap>
						{this.props.headline}
					</Typography>}
					{subheading && <Typography className={classes.subheading} variant="subheading" noWrap>
						{this.props.subheading}
					</Typography>}
					{searchable && <div className={classes.search}>
						<div className={classes.searchIcon}><SearchIcon /></div>
						<Input
							placeholder="Search…"
							disableUnderline
							classes={{ root: classes.inputRoot, input: classes.inputInput }}
							value={queryParams.search || ""}
							onChange={onSearch}
						/>
					</div>}
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{changed && <IconButton color="inherit" onClick={onSave}><SaveIcon /></IconButton>}
						{/* {changed && <IconButton color="inherit" onClick={onUndo}><UndoIcon /></IconButton>} */}
						{changed && 
							<ConfirmButton 
								variant="icon"
								icon={<UndoIcon />} 
								text="Undo"
								message="Undo the changes?"
								onYes={onUndo}
							/>
						}
						{addable && <IconButton color="inherit" onClick={onAdd}><AddIcon /></IconButton>}
						{editable && <IconButton color="inherit" onClick={onEdit}><EditIcon /></IconButton>}
						{onView && viewList.map((v: string, i: number) => {
							const viewIcon = v === "table" ? <TableIcon /> :
											 v === "list" ? <ListIcon /> :
											 v === "form" ? <FormIcon /> :
											 v === "card" ? <CardIcon /> : <FormIcon />;
							return (
								<IconButton key={i} color="inherit" onClick={onView.bind(event, v)}>
									{viewIcon}
								</IconButton>
							);
						})}
					</div>
					<div className={classes.sectionMobile}>
						{more && 
							<IconButton aria-haspopup="true"  color="inherit">
								<MoreIcon />
							</IconButton>
						}
					</div>
					{filterable && <IconButton color="inherit" onClick={this.toggleFilterExpand}><FilterListIcon /></IconButton>}
					{expandable && <IconButton color="inherit" onClick={onExpand}>
						{expandAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</IconButton>}
				</Toolbar>
				<Collapse in={this.state.moreExpand} timeout="auto" unmountOnExit>
					<Paper className={classes.sectionExpand}>
						{more}
					</Paper>
				</Collapse>
			</AppBar>
		);
	}
});
