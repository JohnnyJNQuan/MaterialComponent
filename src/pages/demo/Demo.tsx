import * as React from "react";
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { WithStyles } from "@material-ui/core";
// import { Badge } from '@material-ui/core';
import { theme1 } from "../../theme"
import AppBar from "../../components/appbar";
import MenuIcon from '@material-ui/icons/Menu';
import { data, primaryFields, secondaryFields, styles, columns } from ".";
import Collection from "../../components/collection";
import { ColGroup, RowGroup } from "../../components/grid";
import { Table } from "../../components/tables";
import { Card } from "../../components/cards";
import { Form } from "../../components/forms";
import { clone } from "../../components/utility";

export default withStyles(styles)(
class extends React.Component<WithStyles<typeof styles>, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            editable: props.editable || true,
            editing: props.editing || false,
            errors: {
                firstName:"",
                lastName: ""
			},
			collection: clone(data)
		};
    }

    handleChange = (i: number, item: any) => {
		console.log(i, item);
		const collection = Object.assign([], this.state.collection);
		collection[i] = item;
		this.setState({ collection });
	}

	handleSave = (i: number, item: any) => {
		console.log(item);
	}

	handleSaveAll = (collection: Array<any>) => {
		console.log(collection);
	}

    handleUndo = (i: number) => {
		const collection = Object.assign([], this.state.collection);
		collection[i] = clone(data[i]);
		this.setState({ collection });
	}
	
    handleUndoAll = () => {
		this.setState({ collection: clone(data) });
	}
	
	render() {
		console.log(this.props);
		console.log(this.state);

		// const { classes } = this.props;
        const { collection } = this.state;

        return (
            <MuiThemeProvider theme={theme1}>
                <Collection
					collection={collection}
					title={["firstName", "lastName"]}
					headline={[(m: any) => m.active ? "active" : "inactive"]}
					view="card"
					viewList={["card","list","table", "form"]}
                    addable
                    editable
					expandable
					selectable
					searchable
					// onChange={this.handleChange}
					// onSave={this.handleSave}
					onSave={this.handleSaveAll}
					// onUndo={this.handleUndo}
					// onUndoAll={this.handleUndoAll}
                >
					<AppBar
						slot="appbar"
						position="sticky"
						variant="dense"
						mainButton={<MenuIcon />}
						title="Contacts"
						more="More Area"
					/>
					<ColGroup
						group="list"
						fields={primaryFields}
					/>
					<Form
						slot="form"
						contents={[
							<RowGroup key={0} group="primary" fields={primaryFields} />,
							<RowGroup key={1} group="secondary" fields={secondaryFields} />
						]}
					/>
                    <Table
						slot="table"
						columns={columns}
					/>
                    <Card
						slot="card"
						contents={[
							<ColGroup key={0} group="primary" fields={primaryFields} />
						]}
						expandContents={[
							<RowGroup key={0} group="secondary" fields={secondaryFields} />
						]}
					/>
				</Collection>
            </MuiThemeProvider>
        );
    }
})
