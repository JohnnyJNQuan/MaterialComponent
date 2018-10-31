import * as React from "react";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import { Collapse, Paper, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import styles from "./style";
import { getActionStatus, includesIn, setActionStatus, clone, convert } from "../utility";
import { IProps, IState, IQueryParams } from "./Collection.d";

const Collection = withStyles(styles)(
class extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
            props,
            collection: clone(props.collection),
            editAll: props.editAll || false,
            expandAll:  props.expandAll || false,
            selectAll: false,
            added: [],
            editings: [],
            expanded: [],
            removed: [],
            selected: [],
            updated: [],
            queryParams: {
                search: "",
                filter: {},
                sort: {},
                page: { number: 1, size: 10}
            },
            view: props.view,
		};
    }

    static getDerivedStateFromProps(props: IProps, state: IState) {
		let changeProps = {};
		if (props.collection !== state.props.collection) {
			changeProps = Object.assign(changeProps, {collection: clone(props.collection)});
		}
		if (props.expandAll !== state.props.expandAll) {
			changeProps = Object.assign(changeProps, {expandAll: props.expandAll});
        }
        
		if (Object.keys(changeProps).length === 0 && changeProps.constructor === Object) return null;
        return { props, ...changeProps };
    }

    // ------ variant selection -----

    handleToggleView = (view: string, event: any) => {
        this.setState({ view });
    }

    // ------ Add ------

    handleAdd = async () => {
        let item: any = {};

		// if (this.props.onAdd) {
		// 	item = await this.props.onAdd();
		// 	if (!item) return;
		// }

		if (this.props.newItem) {
			item = typeof(this.props.newItem) === "function" ? this.props.newItem() : this.props.newItem;
        }

		const collection = Object.assign([], this.state.collection);
        const added = this.state.added.splice(0);
        const editings = this.state.editings.splice(0);
		const expanded = this.state.expanded.splice(0);
		const removed = this.state.removed.splice(0);
		const selected = this.state.selected.splice(0);
		const updated = this.state.updated.splice(0);
		if (this.props.addToFirst) {
			// shift index
			added.forEach((v: any, i: number, a: any) => { a[i] += 1; });
			editings.forEach((v: any, i: number, a: any) => { a[i] += 1; });
			expanded.forEach((v: any, i: number, a: any) => { a[i] += 1; });
			selected.forEach((v: any, i: number, a: any) => { a[i] += 1; });
			updated.forEach((v: any, i: number, a: any) => { a[i] += 1; });
			removed.forEach((v: any, i: number, a: any) => { a[i] += 1; });
			// add new
			collection.unshift(item);
			added.splice(0, 0, 0);
			editings.splice(0, 0, 0); // set new item in editing
		} else {
			collection.push(item);
			added.splice(0, 0, collection.length - 1);
			editings.splice(0, 0, collection.length - 1); // set new row for editing
			expanded.push(collection.length - 1);  // expand it
		}
		this.setState({
				added, editings, expanded, removed, selected, updated, collection
            }, () => {
                if (typeof(this.props.onChange) === "function") {
                    this.props.onChange(collection);
                }
            }
		);
    }

    // ------ edit ------

    handleToggleEdit = (i: number) => {
        const editings = this.state.editings.splice(0);
        const p = editings.indexOf(i);
        if (p !== -1) {
            editings.splice(p, 1);
        } else {
            editings.splice(i, 0, i);
        }
        this.setState({ editings });
    }
    handleToggleEditAll = () => {
        const editings: any = [];
        let expanded = this.state.expanded.splice(0);
        const editAll = !this.state.editAll;
        if (editAll) {
            expanded = [];
            this.state.collection.forEach((item: any, i: number) => {
                editings.push(i);
                expanded.push(i);
            });
        }
		this.setState({ editAll, editings, expanded});
    }

    // ------ expand ------

    handleToggleExpand = (i: number): any => {
        const expanded = this.state.expanded.splice(0);
        const p = expanded.indexOf(i);
        if (p === -1) {
            expanded.splice(i, 0, i);
        } else {
            expanded.splice(p, 1);
        }
        // expanded.push(i);
        this.setState({ expanded });
    }
    handleToggleExpandAll = () => {
        const expandAll = !this.state.expandAll;
        const expanded: Array<number> = [];
        if (expandAll) {
            this.state.collection.forEach((o: any, i: number) => {
                expanded.push(i);
            });
        }
        this.setState({ expandAll, expanded, controlled: false });

    }

    // ------ query (sort, query, page) -----

    handleQuery = (params: IQueryParams) => {
		// Search
		const { onQuery } = this.props;
        if (onQuery && typeof(onQuery) === "function") {
            onQuery(params);
        }
    }

    handleSearch = (event: any) => {
		const { onQuery } = this.props;
		const queryParams = this.props.queryParams || {};
		let collection: any = Object.assign([], this.state.collection);
		queryParams.search = event.target.value;
		const search = event.target.value;

		// search external
		if (onQuery && typeof(onQuery) === "function") {
			return this.setState({ queryParams }, () => {
				if (this.props.onQuery) {
					this.handleQuery(queryParams);
				}
			});
		}
		// search internal
		collection = queryParams.search
			? this.state.collection.filter((x: any) => includesIn(x, search))
			: clone(this.props.collection);  // empty search
		this.setState({ queryParams, collection });
    }

    handleSort = (event: any, orderby: any) => {
        const queryParams = this.props.queryParams || {};
        const sort = queryParams.sort || {};
        if (sort.orderBy === orderby && sort.order === "desc") {
            sort.order = "asc";
        }
        queryParams.sort = sort;
        this.setState({ queryParams }, () => this.handleQuery(queryParams));
    }

    handlePagination = (event: any, page: any) => {
        const queryParams = this.props.queryParams || {};
        queryParams.page = page;
        this.setState({ queryParams }, () => this.handleQuery(queryParams));
    }

    handlePageNumber = (event: any, pageNumber: number) => {
        const queryParams = this.props.queryParams || {};
        queryParams.page.number = pageNumber;
        this.setState({ queryParams }, () => this.handleQuery(queryParams));
    }

    handlePageSize = (event: any, pageSize: number) => {
        const queryParams = this.props.queryParams || {};
        queryParams.page.size = pageSize;
        this.setState({ queryParams }, () => this.handleQuery(queryParams));
    }

    // ------ remove ------

    handleRemove = (i: number) => {
        const removed = this.state.removed.splice(0);
        removed.push(i);
        this.setState({ removed });
	}

    handleRemoveAll = () => {
        const removed = this.state.removed.splice(0);
        this.state.collection.forEach((item: any, i: number) => {
            removed.push(i);
        });
        this.setState({ removed });
    }

    // ------ save ------

    // handleSave = (i: number) => {
    //     const { collection, added, updated, removed } = this.state;
    //     const arr = setActionStatus(collection, added, updated, removed);
    //     const item = arr[i];
    //     console.log(i, item);
    //     if (this.props.onSave && typeof(this.props.onSave) === "function") {
    //         this.props.onSave(i, item);
    //     }
    // }

    handleSave = () => {
        const { collection, added, updated, removed } = this.state;
        const arr = setActionStatus(collection, added, updated, removed);
        console.log(arr);
        if (typeof(this.props.onSave) === "function") {
			const result = this.props.onSave(arr);
			if (result) {
				this.setState({
					added: [],
					updated: [],
					removed: []
				})
			}
        }
    }

    // ------ select ------

    isSelected = (i: number) => this.state.selected.indexOf(i) !== -1;

    handleSelect = (i: number, event: any) => {
        // const selected = this.state.selected.splice(0);
        // selected.push(i);
        // this.setState({ selected });
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(i);
        let newSelected: any = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, i);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
          );
        }

        this.setState({ selected: newSelected });
    }

    handleSelectAll = (event: any) => {
        if (event.target.checked) {
            this.setState((state: any) => ({ selected: state.collection.map((n: any) => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    }

    // ------ undo ------

    handleUndo = (i: number, event: any) => {
        const collection: Array<any> = Object.assign([], this.state.collection);
        collection[i] = clone(this.props.initialCollection[i]);
		let p = -1;

		const added: Array<any> = Object.assign([], this.state.added);
		p = this.state.added.indexOf(i);
        if (p !== -1) {
            collection.splice(i, 1);
            added.splice(p, 1);
        }
        const removed: Array<any> = Object.assign([], this.state.removed);
        p = this.state.removed.indexOf(i);
        if (p !== -1) {
            removed.splice(p, 1);
        }
        const updated: Array<any> = Object.assign([], this.state.updated);
        p = this.state.updated.indexOf(i);
        if (p !== -1) {
            updated.splice(p, 1);
        }

		this.setState({
			added, removed, updated, collection
		}, () => {
			if (typeof(this.props.onChange) === "function") {
				this.props.onChange(collection);
			}
		});
	}

	handleUndoAll = () => {
        const collection =  clone(this.props.initialCollection);
		this.setState({
			added: [], removed: [],	updated: [], collection
		}, () => {
			if (typeof(this.props.onChange) === "function") {
				this.props.onChange(collection);
			}
		});
	}

    // ------ Change ------

    handleChange = (i: number, event: any) => {
		console.log("collection", event.target.value);
        const collection: any = Object.assign([], this.state.collection);
		const name = event.target.name;
		const type = event.target.type;
		switch (type) {
            case "checkbox":
            case "switch":
				collection[i][name] = convert(event.target.checked, type);
                break;
            case "date":
                // TODO
                collection[i][name] = convert(event.target.value, type);
                break;
			default:
				collection[i][name] = convert(event.target.value ,type);
				break;
		}
        const updated = this.state.updated.splice(0);
        if (updated.indexOf(i) === -1) {
            updated.push(i);
        }
        this.setState({
			updated, collection
		}, () => {
			if (typeof(this.props.onChange) === "function") {
				this.props.onChange(collection);
			}
		});
    }

	// ------ children slot ------

	getChild = (children: any, slot: string, props: any) => {
		let slottedChild = null; // Default to null since react can render null if a slot isn"t found
		// Iterate over children to find the slot needed
		React.Children.forEach(children, (child) => {
		  if (!React.isValidElement(child)) { // Check that it is a valid react element.
			return; // Return since we can"t do anything with a child without props.
		  }
		  const slotName = "slot";
		  if (child.props[slotName] === slot) { // Verify it matches the slot we are looking for.
			slottedChild = React.cloneElement(child, ...props); // Clone it and set it to the slotted child
		  }
		});
		return slottedChild;
    }

    getAppbar = () => {
        const { addable, editable, expandable, newItem, searchable, selectable, viewList } = this.props;
        const { added, collection, expandAll, queryParams, updated, removed, view } = this.state;
		return this.getChild(this.props.children, "appbar", {
			addable,
			changed: added.length > 0 || updated.length > 0 || removed.length > 0,
            collection,
			editable,
			expandable,
            expandAll,
            newItem,
			queryParams,
			searchable,
			selectable,
			onAdd: this.handleAdd,
			onSave: this.handleSave,
			onSearch: this.handleSearch,
			onUndo: this.handleUndoAll,
			onEdit: this.handleToggleEditAll,
            onExpand: this.handleToggleExpandAll,
            onView: this.handleToggleView,
			view,
			viewList
		});
    }

	// TODO change to list
    getList = () => {
        const { classes, editable } = this.props;
        const { added, expanded, editings, updated, removed, collection } = this.state;
        return collection && collection.map((item: any, i: number) => {
			console.log(item);
            const editing = editings.indexOf(i) !== -1;
            const content = this.getChild(this.props.children, "list", {
				editable,
                editing,
				values: item,
                onChange: this.handleChange.bind(this, i)
            });
            let msg = "";
            if (updated.indexOf(i) !== -1) msg = "U";
            if (added.indexOf(i) !== -1) msg = "A";
            if (removed.indexOf(i) !== -1) msg = "D";
            const add = added.indexOf(i) !== -1;
            const remove = removed.indexOf(i) !== -1;
            const update = updated.indexOf(i) !== -1;
			const change = add || remove || update;
			// const status = getActionStatus(i, added, removed, updated);

            return (
                <ExpansionPanel key={i} expanded={expanded.indexOf(i) !== -1} onChange={this.handleToggleExpand.bind(this, i)} >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Avatar className={classes.panelAvatar} >{msg}</Avatar>
                        <Typography color="primary" className={classes.heading}>
                            {/* {getValueByName(item, title, "heading")} */}
                        </Typography>
                        <Typography color="secondary" className={classes.secondaryHeading}>
                            {/* {getValueByName(item, title, "subheading")} */}
                        </Typography>
                    </ExpansionPanelSummary>
                    <Divider light />
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        {content}
                    </ExpansionPanelDetails>
                    <Divider light />
                    <ExpansionPanelActions>
                        {change && <Button color="inherit" onClick={this.handleUndo.bind(this, i)} >Undo</Button>}
                        {editable && <Button color="inherit" onClick={this.handleToggleEdit.bind(this, i)} >Edit</Button>}
                        <Button color="inherit" onClick={this.handleRemove.bind(this, i)} >Delete</Button>
                    </ExpansionPanelActions>
                  </ExpansionPanel>
            );
        });
    }

    getTable = () => {
        const { expandable, selectable } = this.props;
        const { expandAll, queryParams, collection, expanded, selected } = this.state;
        return this.getChild(this.props.children, "table", {
            expandable,
            expandAll,
			expanded,
			selectable,
            selected,
            rows: collection,
            page: queryParams ? queryParams.page.number : 1,
            rowsPerPage: queryParams ? queryParams.page.size : 10,
            onChange: this.handleChange,
            onChangePage: this.handlePageNumber,
            onChangeSize: this.handlePageSize,
            onExpand: this.handleToggleExpand,
            onExpandAll: this.handleToggleExpandAll,
            onSelect: this.handleSelect,
            onSelectAll: this.handleSelectAll
        });
	}

	getCards = () => {
        const { addable, editable, expandable, title, headline, subheading } = this.props;
		const { added, editings, editAll, expandAll, expanded, updated, removed, collection } = this.state;
		return collection && collection.map((item: any, i: number) => {
			return this.getChild(this.props.children, "card", {
				key: i,
				index: i,
				status: getActionStatus(i, added, removed, updated),
				values: item,
				title,
				headline,
				subheading,
				addable,
				changed: added.length > 0 || updated.length > 0 || removed.length > 0,
				editable,
				editing: (editAll || editings.indexOf(i) !== -1),
                expandable,
                expanded: (expandAll || expanded.indexOf(i) !== -1),
				onChange: this.handleChange.bind(this, i),
				onEdit: this.handleToggleEdit.bind(this, i),
				onExpand: this.handleToggleExpand.bind(this, i),
				onSave: this.handleSave.bind(this, i),
				onUndo: this.handleUndo.bind(this, i)
			});
		});
    }

	getForms = () => {
       const { editable } = this.props;
		const { added, editings, editAll, expandAll, updated, removed, collection } = this.state;
		return collection && collection.map((item: any, i: number) => {
            const expanded = expandAll || editings.indexOf(i) !== -1;
			return this.getChild(this.props.children, "form", {
				key: i,
				index: i,
				changed: added.length > 0 || updated.length > 0 || removed.length > 0,
				editable,
				editing: (editAll || editings.indexOf(i) !== -1),
				expanded,
				status: getActionStatus(i, added, removed, updated),
				values: item,
                onChange: this.handleChange.bind(this, i),
				onEdit: this.handleToggleEdit.bind(this, i),
				onExpand: this.handleToggleExpand.bind(this, i),
				onSave: this.handleSave.bind(this, i),
                onUndo: this.handleUndo.bind(this, i),
                controlled: true
			});
		});
    }

    getSlot = (slot: string) => {
        const { editable } = this.props;
		const { added, editings, editAll, expandAll, expanded, updated, removed, collection } = this.state;
		return collection && collection.map((item: any, i: number) => {
			return this.getChild(this.props.children, slot, {
				key: i,
				index: i,
				changed: added.length > 0 || updated.length > 0 || removed.length > 0,
				editable,
				editing: (editAll || editings.indexOf(i) !== -1),
				expanded: (expandAll || expanded.indexOf(i) !== -1),
				status: getActionStatus(i, added, removed, updated),
				values: item,
				onChange: this.handleChange.bind(this, i),
				onEdit: this.handleToggleEdit.bind(this, i),
				onExpand: this.handleToggleExpand.bind(this, i),
				onSave: this.handleSave.bind(this, i),
				onUndo: this.handleUndo.bind(this, i)
			});
		});
    }

	// ------ render ------

    render() {
		const { classes } = this.props;
		const { expandAll } = this.state;
        const appbar = this.getAppbar();

		let content = null;
		let flexDirection = classes.contentColumnDirection;
		const contentExpand = expandAll ? classes.contentExpand : {};

        switch (this.state.view) {
            case "form":
                content = this.getForms();
                break;
            case "list":
                content = this.getList();
                break;
            case "table":
                content = this.getTable();
                break;
            case "card":
				content = this.getCards();
				flexDirection = classes.contentRowDirection;
                break;
            default:
                break;
		}

		return (
			<Paper className={classnames(classes.root, contentExpand)}>
                {appbar}
                <Collapse in={this.state.expandAll} timeout="auto" unmountOnExit>
                    <div className={classnames(classes.content, flexDirection)}>
                        {content}
                    </div>
                </Collapse>
			</Paper>
        );
    }
});

export default Collection;
