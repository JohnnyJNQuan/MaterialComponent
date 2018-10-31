import * as React from "react";
import * as moment from "moment";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { Button, IconButton, Snackbar } from "@material-ui/core";
import { theme1 } from "../../../theme"
import AppBar from "../../../components/appbar";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from '@material-ui/icons/Close';
import Collection from "../../../components/collection";
import { ColGroup, FlexGroup, RowGroup } from "../../../components/grid";
// import { Table } from "../../../components/tables";
// import { List } from "../../../components/lists";
import { Form } from "../../../components/forms";
import { convert, clone, getPropNameList, replaceIn, getPropNameValues } from "../../../components/utility";
import { IProps, IState } from "./Questionsheet.d";
import { data, qsMainFields, qsAmountFields, qsConditionFields, qsDateFields, qsPropertyFields, 
	qsPropertyLotFields, qsRelationshipFields, qsPropertyRentalFields, qsPropertyTenantFields
} from "./data";
import styles from "./style";

export default withStyles(styles)(
class extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
			editable: props.editable || true,
			editAll: false,
			editing: {
				qs: false,
				client: false,
				otherside: false,
				otherparty: false,
				property: false,
				propertyLot: false,
				tenant: false,
				amount: false,
				date: false,
				condition: true
			},
			changed: {
				qs: false,
				client: false,
				otherside: false,
				otherparty: false,
				property: false,
				propertyLot: false,
				tenant: false,
				amount: false,
				date: false,
				condition: false
			},
			errors: {
				conveyance: {
					clientNames: ""
				}
			},
			expandAll: false,
			expanded: {
				qs: false,
				client: false,
				otherside: false,
				otherparty: false,
				property: false,
				propertyLot: false,
				tenant: true,
				amount: false,
				date: false,
				condition: false
			},
			relationships: clone(props.relationships || data.relationships),
			clients: this.filterRelationships(props.relationships || data.relationships, "Client"),
			othersides: this.filterRelationships(props.relationships || data.relationships, "Otherside"),
			otherparties: this.filterRelationships(props.relationships || data.relationships, "Otherparty"),
			conveyance: clone(props.conveyance || data.conveyance.detail),
			property: clone(props.property || data.conveyance.property),
			propertyLots:  clone(props.propertyLots || data.conveyance.propertyLots),
			conditions: clone(props.conditions || data.conveyance.conditions),
            queryParams: {
				otherside:	{ search: "", filter: {}, sort: { id: "desc" }, page: 1, size: 10 },
				otherparty: { search: "", filter: {}, sort: { id: "desc" }, page: 1, size: 10 }
			},
			snackbarOpen: false,
			snackbarMessage: "",
			props
		};
	}

	// ------ AppBar

	handleToggleExpandAll = () => {
		const expandAll = !this.state.expandAll;
		this.setState({
			expandAll,
			expanded: {
				qs: expandAll,
				amount: expandAll,
				date: expandAll,
				property: expandAll,
				propertyLot: expandAll,
				client: expandAll,
				otherside: expandAll,
				otherparty: expandAll,
				condition: expandAll,
				tenant: expandAll
			}
		});
	}
	handleToggleEditAll = () => {
		const editAll = !this.state.editAll;
		this.setState({
			editAll,
			editing: {
				qs: editAll,
				amount: editAll,
				date: editAll,
				property: editAll,
				propertyLot: editAll,
				client: editAll,
				otherside: editAll,
				otherparty: editAll,
				condition: editAll,
				tenant: editAll
			}
		})
	}
	handleUndoAll = () => {
		this.setState({
			conveyance: clone(this.props.conveyance || data.conveyance.detail),
			property: clone(this.props.property || data.conveyance.property),
			propertyLots: clone(this.props.propertyLots || data.conveyance.propertyLots),
			relationships: clone(this.props.relationships || data.relationships),
			conditions: clone(this.props.conditions || data.conveyance.conditions),
			clients: this.filterRelationships(this.props.relationships || data.relationships, "Client"),
			othersides: this.filterRelationships(this.props.relationships || data.relationships, "Otherside"),
			otherparties: this.filterRelationships(this.props.relationships || data.relationships, "Otherparty"),
			changed: {
				qs: false,
				amount: false,
				date: false,
				property: false,
				propertyLot: false,
				client: false,
				otherside: false,
				otherparty: false,
				condition: false,
				tenant: false
			},
			snackbarOpen: true,
			snackbarMessage: "All undo"
		});
		
	}
	handleSaveAll = () => {
		const model = {
			conveyance: this.state.conveyance,
			property: this.state.property,
			propertyLot: this.state.propertyLots,
			conditions: this.state.conditions,
			// relationships: this.state.relationships,
			clients: this.state.clients,
			othersides: this.state.othersides,
			otherparties: this.state.otherparties
		};
		console.log("to save all:", model);
		const snackbarOpen = true;
		const snackbarMessage = "All saved";
		const changed = {
			qs: false,
			amount: false,
			date: false,
			property: false,
			propertyLot: false,
			client: false,
			otherside: false,
			otherparty: false,
			condition: false,
			tenant: false
		}	
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}
	isChanged = () => 
		this.state.changed.qs || 
		this.state.changed.amount ||
		this.state.changed.date ||
		this.state.changed.property ||
		this.state.changed.propertyLot ||
		this.state.changed.condition ||
		this.state.changed.client ||
		this.state.changed.otherside ||
		this.state.changed.otherparty ||
		this.state.changed.tenant;

	// ------ QS slot (section)

	handleChangeQs = (event: any) => {
		const conveyance = Object.assign({}, this.state.conveyance);
		const changed = Object.assign({}, this.state.changed);
		conveyance[event.target.name] = event.target.value;
		changed.qs = true;
		this.setState({ conveyance, changed });
	}
	handleExpandQs = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.qs = !expanded.qs;
		this.setState({ expanded });
	}
	handleUndoQs = () => {
		const conveyance = replaceIn(this.state.conveyance, this.props.conveyance || data.conveyance.detail, getPropNameList(qsMainFields))
		const changed = Object.assign({}, this.state.changed);
		changed.qs = false;		
		this.setState({ conveyance, changed });
	}
	handleSaveQs = () => {
		const names = getPropNameList(qsMainFields);
		const values = getPropNameValues(this.state.conveyance, names);
		console.log("to save: ", values);
		const snackbarOpen = true;
		const snackbarMessage = "qustionsheet saved";
		const changed = Object.assign({}, this.state.changed);
		changed.qs = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ------ Amount slot (section)

	handleExpandAmount = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.amount = !expanded.amount;
		this.setState({ expanded });
	}
	handleChangeAmount = (event: any) => {
		const conveyance = Object.assign({}, this.state.conveyance);
		const changed = Object.assign({}, this.state.changed);
		conveyance[event.target.name] = event.target.value;
		changed.amount = true;
		this.setState({ conveyance, changed });
	}
	handleUndoAmount = () => {
		const names = getPropNameList(qsAmountFields);
		const conveyance = replaceIn(this.state.conveyance, this.props.conveyance || data.conveyance.detail, names);
		const changed = Object.assign({}, this.state.changed);
		changed.amount = false;		
		this.setState({ conveyance, changed });
	}
	handleSaveAmount = () => {
		const names = getPropNameList(qsAmountFields);
		const values = getPropNameValues(this.state.conveyance, names);
		console.log("to save: ", values);		const snackbarOpen = true;
		const snackbarMessage = "Amounts saved";
		const changed = Object.assign({}, this.state.changed);
		changed.amount = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});	}

	// ------ Date slot (section)

	handleExpandDate = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.date = !expanded.date;
		this.setState({ expanded });
	}
	handleChangeDate = (event: any) => {
		const conveyance = Object.assign({}, this.state.conveyance);
		conveyance[event.target.name] = event.target.value;
		const changed = Object.assign({}, this.state.changed);
		changed.date = true;
		this.setState({ conveyance, changed });
	}
	handleUndoDate = () => {
		const names = getPropNameList(qsDateFields);
		const conveyance = replaceIn(this.state.conveyance, this.props.conveyance || data.conveyance.detail, names);
		const changed = Object.assign({}, this.state.changed);
		changed.date = false;		
		this.setState({ conveyance, changed });
	}
	handleSaveDate = () => {
		const names = getPropNameList(qsDateFields);
		const values = getPropNameValues(this.state.conveyance, names);
		console.log("to save: ", values);
		const snackbarOpen = true;
		const snackbarMessage = "Dates saved";
		const changed = Object.assign({}, this.state.changed);
		changed.date = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ----- Property

	handleExpandProperty = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.property = !expanded.property;
		this.setState({ expanded });
	}
	handleChangeProperty = (event: any, item: any, type: string) => {

		const property = Object.assign({}, this.state.property);
		const changed = Object.assign({}, this.state.changed);
		if (type === "address") {
			property.address = item;
		}
		else {
			property[event.target.name] = event.target.value;
		}
		changed.property = true;
		this.setState({ property, changed });
	}
	handleEditProperty = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.property = !expanded.property;
		this.setState({ expanded });
	}

	handleUndoProperty = () => {
		const names = getPropNameList(qsPropertyFields);
		const property = replaceIn(this.state.property, this.props.property || data.conveyance.property, names);
		const changed = Object.assign({}, this.state.changed);
		changed.property = false;		
		this.setState({ property, changed });
	}

	handleSaveProperty = () => {
		const names = getPropNameList(qsPropertyFields);
		const values = getPropNameValues(this.state.property, names);
		console.log("to save: ", values);
		const changed = Object.assign({}, this.state.changed);
		changed.property = false;
		this.setState({
			changed,
			snackbarOpen: true,
			snackbarMessage: "Property saved"
		});
	}

	// ----- Property

	handleExpandTenant = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.tenant = !expanded.tenant;
		this.setState({ expanded });
	}
	handleChangeTenant = (event: any, item: any, type: string) => {
		const conveyance = Object.assign({}, this.state.conveyance);
		const changed = Object.assign({}, this.state.changed);
		conveyance[event.target.name] = convert(event.target.value, event.target.type);
		changed.tenant = true;
		this.setState({ conveyance, changed });
	}
	handleEditTenant = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.tenant = !expanded.tenant;
		this.setState({ expanded });
	}

	handleUndoTenant = () => {
		const names = getPropNameList(qsPropertyFields);
		const conveyance = replaceIn(this.state.conveyance, this.props.conveyance || data.conveyance.detail, names);
		const changed = Object.assign({}, this.state.changed);
		changed.tenant = false;		
		this.setState({ conveyance, changed });
	}

	handleSaveTenant = () => {
		const names = getPropNameList(qsPropertyRentalFields);
		const values = getPropNameValues(this.state.conveyance, names);
		console.log("to save: ", values);
		const changed = Object.assign({}, this.state.changed);
		changed.tenant = false;
		this.setState({
			changed,
			snackbarOpen: true,
			snackbarMessage: "Property saved"
		});
	}

	renderTenantContent = (isRented: boolean) => {
		const contents = [<ColGroup key={0} fields={qsPropertyRentalFields} />];
		if (isRented) {
			contents.push(<ColGroup key={1} fields={qsPropertyTenantFields} />)
		}
		return contents;
	}
	
	// ----- Property Lots

	handleExpandPropertyLots = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.propertyLot = !expanded.propertyLot;
		this.setState({ expanded });
	}

	handleEditPropertyLots = () => {
		const editing = Object.assign({}, this.state.editing);
		editing.propertyLot = !editing.propertyLot;
		this.setState({ editing });
	}

	handleChangePropertyLots = (propertyLots: Array<any>) => {
		const changed = Object.assign({}, this.state.changed);
		changed.propertyLot = true
		this.setState({ propertyLots });
	}

	handleSavePropertyLots = (propertyLots: Array<any>) => {
		console.log(propertyLots);
		const snackbarOpen = true;
		const snackbarMessage = "Property lots saved";
		const changed = Object.assign({}, this.state.changed);
		changed.propertyLot = false;		
		this.setState({
			propertyLots,
			changed,
			snackbarOpen,
			snackbarMessage
		});
		return true;
	}

	// ----- Conditions

	handleExpandConditions = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.condition = !expanded.condition;
		this.setState({ expanded });
	}

	handleEditConditions = () => {
		const editing = Object.assign({}, this.state.editing);
		editing.condition = !editing.condition;
		this.setState({ editing });
	}

	handleChangeConditions = (conditions: Array<any>) => {
		const changed = Object.assign({}, this.state.changed);
		changed.condition = true
		this.setState({ conditions });
	}

	handleSaveConditions = (conditions: Array<any>) => {
		console.log(conditions);
		const snackbarOpen = true;
		const snackbarMessage = "Conditions saved";
		const changed = Object.assign({}, this.state.changed);
		changed.condition = false;		
		this.setState({
			conditions,
			changed,
			snackbarOpen,
			snackbarMessage
		});
		return true;
	}

	getConditionHeadline = () => {
		let s = "";
		this.state.conditions.forEach((r) => {
			s += ", " + r.conditionDetail;
		});
		return s.substring(2);
	}

	// ------ Relationships

	filterRelationships = (arr: Array<any>, code: string) => {
		if (!arr || !code) return [];
		return arr.filter(x => x.relationshipTypeCode === code)
	}

	mergeRelationships = (arr: Array<any>, code: string) => {
		const excluded = this.state.relationships.filter(x => x.relationshipTypeCode !== code);
		return excluded.concat(arr);
	}

	// ----- Clients	

	handleExpandClients = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.client = !expanded.client;
		this.setState({ expanded });
	}

	handleEditClients = () => {
		const editing = Object.assign({}, this.state.editing);
		editing.client = !editing.client;
		this.setState({ editing });
	}

	handleChangeClients = (clients: Array<any>) => {
		// const relationships = this.mergeRelationships(collection, "Client");		
		const changed = Object.assign({}, this.state.changed);
		changed.clients = true
		this.setState({ clients, changed });
	}

	handleSaveClients = (clients: Array<any>) => {
		console.log(clients);
		const snackbarOpen = true;
		const snackbarMessage = "Client saved";
		const changed = Object.assign({}, this.state.changed);
		changed.client = false;		
		this.setState({
			clients,
			changed,
			snackbarOpen,
			snackbarMessage
		});
		return true;
	}

	// ----- Othersides	

	handleExpandOthersides = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.Otherside = !expanded.Otherside;
		this.setState({ expanded });
	}

	handleEditOthersides = () => {
		const editing = Object.assign({}, this.state.editing);
		editing.otherside = !editing.otherside;
		this.setState({ editing });
	}

	handleChangeOthersides = (othersides: Array<any>) => {
		// const relationships = this.mergeRelationships(collection, "Otherside");
		const changed = Object.assign({}, this.state.changed);
		changed.otherside = true
		this.setState({ othersides, changed });
	}

	handleSaveOthersides = (othersides: Array<any>) => {
		console.log(othersides);
		const snackbarOpen = true;
		const snackbarMessage = "Othersides saved";
		const changed = Object.assign({}, this.state.changed);
		changed.otherside = false;		
		this.setState({
			othersides,
			changed,
			snackbarOpen,
			snackbarMessage
		});
		return true;
	}

	// ----- Otherparties	

	handleExpandOtherparties = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.Otherside = !expanded.Otherside;
		this.setState({ expanded });
	}

	handleEditOtherparties = () => {
		const editing = Object.assign({}, this.state.editing);
		editing.otherparty = !editing.otherparty;
		this.setState({ editing });
	}

	handleChangeOtherparties = (otherparties: Array<any>) => {
		// const relationships = this.mergeRelationships(collection, "Otherside");
		const changed = Object.assign({}, this.state.changed);
		changed.otherparty = true
		this.setState({ otherparties });
	}

	handleSaveOtherparties = (otherparties: Array<any>) => {
		console.log(otherparties);
		const snackbarOpen = true;
		const snackbarMessage = "Otherparties saved";
		const changed = Object.assign({}, this.state.changed);
		changed.otherparty = false;		
		this.setState({
			otherparties,
			changed,
			snackbarOpen,
			snackbarMessage
		});
		return true;
	}
	
	// ------ Snackbar

	handleCloseSnackbar = () => this.setState({ snackbarOpen: false });

	// ====== render

	render() {
		console.log(this.props);
		console.log(this.state);

		const { conveyance, conditions, relationships } = this.state;
		const { property, propertyLots, clients, othersides, otherparties } = this.state;
		
		// const { classes } = this.props;
		// const dateHeadline = moment(conveyance.settlementDate).format("DD/MM/YYYY");
		// const clients = this.filterRelationships(relationships,"Client");
		// const othersides = this.filterRelationships(relationships,"Otherside");
		// const otherparties = this.filterRelationships(relationships,"Otherparty");

        return (
            <MuiThemeProvider theme={theme1}>
				<AppBar
					slot="appbar"
					position="sticky"
					color="primary"
					changed={this.isChanged()}
					mainButton={<MenuIcon />}
					title="Conveyances"
					headline="Question Sheet"
					editable
					editAll={this.state.editAll}
					expandable
					expandAll={this.state.expandAll}
					onExpand={this.handleToggleExpandAll}
					onEdit={this.handleToggleEditAll}
					onSave={this.handleSaveAll}
					onUndo={this.handleUndoAll}
				/>

				{/* QS header */}
				<Form
					slot="qs"
					actionable
					changed={this.state.changed.qs}
					editable
					editing={this.state.editing.qs}
					expanded={this.state.expanded.qs}
					title="QS"
					color="secondary"
					headline={["clientNames"]}
					subheading={["tenancies"]}
					contents={[
						<ColGroup key={0} fields={qsMainFields} />
					]}
					values={conveyance}
					onChange={this.handleChangeQs}
					onExpand={this.handleExpandQs}
					onSave={this.handleSaveQs}
					onUndo={this.handleUndoQs}
				/>

				{/* Amounts */}
				<Form
					slot="amount"
					actionable
					changed={this.state.changed.amount}
					editable
					editing={this.state.editing.amount}
					expanded={this.state.expanded.amount}
					headline={["contractPrice"]}
					title="Amounts"
					color="secondary"
					contents={[
						<RowGroup key={0} fields={qsAmountFields} />
					]}
					values={conveyance}
					onChange={this.handleChangeAmount}
					onExpand={this.handleExpandAmount}
					onSave={this.handleSaveAmount}
					onUndo={this.handleUndoAmount}
				/>

				{/* Dates */}
				<Form
					slot="date"
					actionable
					changed={this.state.changed.date}
					editable
					editing={this.state.editing.date}
					expanded={this.state.expanded.date}
					headline={moment(conveyance.settlementDate).format("DD/MM/YYYY")}
					title="Dates"
					color="secondary"
					contents={[
						<ColGroup key={0} fields={qsDateFields} />
					]}
					values={conveyance}
					onChange={this.handleChangeDate}
					onExpand={this.handleExpandDate}
					onUndo={this.handleUndoDate}
					onSave={this.handleSaveDate}
				/>

				{/* Conditions */}
				<Collection
					view="form"
					editAll={this.state.editAll || this.state.editing.condition}
					expandAll={this.state.expandAll || this.state.expanded.condition}
					addable
					editable
					expandable
					collection={conditions}
					initialCollection={this.props.conditions || data.conveyance.conditions}
					onExpand={this.handleExpandConditions}
					onEdit={this.handleEditConditions}
					onChange={this.handleChangeConditions}
					onSave={this.handleSaveConditions}
                >
					<AppBar
						slot="appbar"
						variant="dense"
						color="secondary"
						title="Conditions"
						headline={this.getConditionHeadline()}
						noBoxShadow
					/>
					<Form
						slot="form"
						contents={[
							<FlexGroup key={0} fields={qsConditionFields} />
						]}
					/>
				</Collection>

				{/* Property */}
				<Form
					slot="Property"
					actionable
					changed={this.state.changed.property}
					editable
					editing={this.state.editing.property}
					expanded={this.state.expanded.property}
					headline={["propertyName"]}
					title="Property"
					color="secondary"
					contents={[
						<ColGroup key={0} fields={qsPropertyFields} />
					]}
					values={property}
					onChange={this.handleChangeProperty}
					onExpand={this.handleExpandProperty}
					onUndo={this.handleUndoProperty}
					onSave={this.handleSaveProperty}
				/>

				{/* Tenant */}
				<Form
					slot="tenant"
					actionable
					changed={this.state.changed.tenant}
					editable
					editing={this.state.editing.tenant}
					expanded={this.state.expanded.tenant}
					headline={["tenantName"]}
					title="Tenant"
					color="secondary"
					contents={this.renderTenantContent(conveyance.isRented)}
					values={conveyance}
					onChange={this.handleChangeTenant}
					onExpand={this.handleExpandTenant}
					onUndo={this.handleUndoTenant}
					onSave={this.handleSaveTenant}
				/>

				{/* Property Lots */}
				<Collection
					view="form"
					title={["registeredInterest"]}
					headline={["lotNumber"]}
					addable
					editable
					editAll={this.state.editing.propertyLot}
					expandable
					expandAll={this.state.expanded.propertyLot}
					collection={propertyLots}
					initialCollection={this.props.propertyLots || data.conveyance.propertyLots}
					newItem={{}}
					onChange={this.handleChangePropertyLots}
					onEdit={this.handleEditPropertyLots}
					onExpand={this.handleExpandPropertyLots}
					onSave={this.handleSavePropertyLots}
                >
					<AppBar
						slot="appbar"
						variant="dense"
						color="secondary"
						avatar={<MenuIcon />}
						title="Property Lots"
						noBoxShadow
					/>
					<Form
						slot="form"
						contents={[
							<ColGroup key={0} group="lot" fields={qsPropertyLotFields} />
						]}
					/>
				</Collection>

				{/* Clients */}
				<Collection
					view="form"
					title={["contactName"]}
					addable
					changed={this.state.changed.client}
					editable
					editAll
					expandable
					expandAll={this.state.expanded.client}
					collection={clients}
					initialCollection={ this.filterRelationships(relationships || data.relationships, "Client")}
					newItem={{ 
						fileId: conveyance.fileId, 
						relationshipTypeId: 1 
					}}
					onChange={this.handleChangeClients}
					onExpand={this.handleExpandClients}
					onEdit={this.handleEditClients}
					onSave={this.handleSaveClients}
				>
					<AppBar
						slot="appbar"
						variant="dense"
						color="secondary"
						avatar={<MenuIcon />}
						title="Clients"
						noBoxShadow
					/>
					<Form
						slot="form"
						contents={[
							<RowGroup key={0} fields={qsRelationshipFields} />
						]}
					/>
				</Collection>

				{/* Othersides */}
				<Collection
					view="form"
					title={["contactName"]}
					addable
					editable
					editAll={this.state.editing.otherside}
					expandable
					expandAll={this.state.expanded.otherside}
					newItem={{ 
						fileId: conveyance.fileId, 
						relationshipTypeId: 2
					}}
					collection={othersides}
					initialCollection={ this.filterRelationships(relationships || data.relationships, "Otherside")}
					onChange={this.handleChangeOthersides}
					onExpand={this.handleExpandOthersides}
					onEdit={this.handleEditOthersides}
					onSave={this.handleSaveOthersides}
                >
					<AppBar
						slot="appbar"
						variant="dense"
						color="secondary"
						avatar={<MenuIcon />}
						title="Other Sides"
						noBoxShadow
					/>
					<Form
						slot="form"
						contents={[
							<RowGroup key={0} fields={qsRelationshipFields} />
						]}
					/>
				</Collection>

				{/* Other Parties */}
				<Collection
					view="form"
                    addable
					editable
					editAll={this.state.editing.otherparty}
					expandable
					expandAll={this.state.expanded.otherparty}
					title={["contactName"]}
					newItem={{ 
						fileId: conveyance.fileId,
						relationshipTypeId: 3
					}}
					collection={otherparties}
					initialCollection={ this.filterRelationships(relationships || data.relationships, "Otherparty")}
					onChange={this.handleChangeOtherparties}
					onExpand={this.handleExpandOtherparties}
					onEdit={this.handleEditOtherparties}
					onSave={this.handleSaveOtherparties}
               >
					<AppBar
						slot="appbar"
						variant="dense"
						color="secondary"
						avatar={<MenuIcon />}
						title="Other Parties"
						noBoxShadow
					/>
					<Form
						slot="form"
						contents={[
							<RowGroup key={0} fields={qsRelationshipFields} />
						]}
					/>
				</Collection>

				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					autoHideDuration={6000}
					ContentProps={{
						"aria-describedby": "message-id",
					}}
					message={<span id="message-id">{this.state.snackbarMessage}</span>}
					open={this.state.snackbarOpen}
					onClose={this.handleCloseSnackbar}
					action={[
						<Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnackbar}>
						  	UNDO
						</Button>,
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							// className={classes.close}
							onClick={this.handleCloseSnackbar}
						>
						  <CloseIcon />
						</IconButton>
					]}
				/>

            </MuiThemeProvider>
        );
    }
})
