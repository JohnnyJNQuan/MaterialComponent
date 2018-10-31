import * as React from "react";
import * as moment from "moment";
// import { Row, Col } from "react-flexbox-grid";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { Button, IconButton, Paper, Snackbar, Typography, Tab, Tabs } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { theme1 } from "../../../theme"
import AppBar from "../../../components/appbar";
import MenuIcon from "@material-ui/icons/Menu";
import Collection from "../../../components/collection";
import { ColGroup, RowGroup } from "../../../components/grid";
import { Form } from "../../../components/forms";
import { convert, clone, getPropNameList, replaceIn, getPropNameValues, toMoney } from "../../../components/utility";
import styles from "./style";
import { IProps, IState } from "./Settlement.d";
import { data, settlementDetailFields, settlementPriceFields, settlementReleaseFields, settlementRateFields, 
	settlementWaterTieredFields,  settlementBcAdminFields, settlementWaterNonTieredFields,
	settlementBcSinkingFields, settlementBcInsuranceFields, settlementBcLotEntitlementFields,
	settlementAdjustmentProRataFields, settlementChequeFields  // settlementSummaryFields
} from "./data";
import { calcSummary } from "./SettlementCalc";

export default withStyles(styles)(
class extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
			editable: props.editable || true,
			editAll: false,
			editing: {
				// preview: false,
				detail: true,
				price: false,
				release: false,
				rate: false,
				water: false,
				bcadmin: false,
				bcsinking: false,
				adjustment: false,
				cheque: false
			},
			changed: {
				// preview: false,
				detail: false,
				price: false,
				release: false,
				rate: false,
				water: false,
				bcadmin: false,
				bcsinking: false,
				bcinsurance: false,
				bclotentitlement: false,
				adjustment: false,
				cheque: false
			},
			errors: {
				conveyance: {
					clientNames: ""
				}
			},
			expandAll: false,
			expanded: {
				preview: true,
				detail: false,
				price: false,
				release: false,
				rate: false,
				water: false,
				bcadmin: false,
				bcsinking: false,
				bcinsurance: false,
				bclotentitlement: false,
				adjustment: false,
				cheque: false
			},
			conveyance: clone(props.conveyance || data.conveyance.detail),
			settlement: clone(props.settlement || data.conveyance.settlement),
			adjustments: clone(props.adjustment || data.conveyance.adjustments),
			cheques: clone(props.cheques || data.conveyance.cheques),
			summary: {
				contractPrice: 1100000,
				initialDeposit: 200000,
				tax: 0,
				releaseFee: 0,
				rateCharge: 0,
				bcAdminCharge: 0,
				bcSinkingCharge: 0,
				bcInsuranceCharge: 0,
				bcLotCharge: 0,
				waterCharge: 0,
				otherCharge: 0,
				balanceOwing: 0,
				chequeTotals: 0
			},
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
				preview: expandAll,
				detail: expandAll,
				price: expandAll,
				release: expandAll,
				rate: expandAll,
				water: expandAll,
				bcadmin: expandAll,
				bcsinking: expandAll,
				bcinsurance: expandAll,
				bclotentitlement: expandAll,
				adjustment: expandAll,
				cheque: expandAll
			}
		});
	}
	handleToggleEditAll = () => {
		const editAll = !this.state.editAll;
		this.setState({
			editAll,
			editing: {
				preview: editAll,
				detail: editAll,
				price: editAll,
				release: editAll,
				rate: editAll,
				water: editAll,
				bcadmin: editAll,
				bcsinking: editAll,
				bcinsurance: editAll,
				bclotentitlement: editAll,
				adjustment: editAll,
				cheque: editAll
			}
		})
	}
	handleUndoAll = () => {
		this.setState({
			conveyance: clone(this.props.conveyance || data.conveyance.detail),
			settlement: clone(this.props.settlement || data.conveyance.settlement),
			adjustments: clone(this.props.adjustments || data.conveyance.adjustments),
			changed: {
				preview: false,
				detail: false,
				price: false,
				release: false,
				rate: false,
				water: false,
				bcadmin: false,
				bcsinking: false,
				bcinsurance: false,
				bclotentitlement: false,
				adjustment: false,
				cheque: false
			}
		});
	}
	handleSaveAll = () => {
		const model = {
			conveyance: this.state.conveyance,
			settlement: this.state.settlement,
			adjustments: this.state.adjustments,
			cheques: this.state.cheques
		};
		console.log("to save all:", model);
	}
	isChanged = () => 
		this.state.changed.detail || 
		this.state.changed.price ||
		this.state.changed.release ||
		this.state.changed.rate ||
		this.state.changed.water ||
		this.state.changed.bcadmin ||
		this.state.changed.bcsinking ||
		this.state.changed.bcinsurance ||
		this.state.changed.bclotentitlement ||
		this.state.changed.adjustment ||
		this.state.changed.cheques;

	// Preview Summary
	handleChangePreview = (event: any) => {
		const settlement = Object.assign({}, this.state.settlement);
		const changed = Object.assign({}, this.state.changed);
		settlement[event.target.name] = event.target.value;
		changed.preview = true;
		this.setState({ settlement, changed });
	}
	handleExpandPreview = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.preview = !expanded.preview;
		this.setState({ expanded });
	}

	renderPreview = (summary: any) => {
		const { classes } = this.props;
		return (
			<div className={classes.preview}>
				<div className={classes.sumLine}>
					<Typography variant="body1">Contract Price</Typography>
					<Typography variant="subheading">{toMoney(summary.contractPrice)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="body1">Deposit</Typography>
					<Typography variant="subheading">{toMoney(summary.initialDeposit)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="body1">Release Fee(s)</Typography>
					<Typography variant="subheading">{toMoney(summary.releaseFee)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="body1">Rate Charge</Typography>
					<Typography variant="subheading">{toMoney(summary.rateCharge)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="body1">Water Charge</Typography>
					<Typography variant="subheading">{toMoney(summary.waterCharge)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="body1">Body Corp - Admin</Typography>
					<Typography variant="subheading">{toMoney(summary.bcAdminCharge)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="body1">Body Corp - Sinking</Typography>
					<Typography variant="subheading">{toMoney(summary.bcSinkingCharge)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="body1">Body Corp - Insurance</Typography>
					<Typography variant="subheading">{toMoney(summary.bcInsuranceCharge)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="body1">Body Corp - Lot</Typography>
					<Typography variant="subheading">{toMoney(summary.bcLotCharge)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="body1">Others</Typography>
					<Typography variant="subheading">{toMoney(summary.otherCharge)}</Typography>
				</div>
				<div className={classes.sumLine}>
					<Typography variant="subheading" color="primary">Balance Owing</Typography>
					<Typography variant="subheading" color="primary">{toMoney(summary.balanceOwing)}</Typography>
				</div>

				<div className={classes.sumLine}>
					<Typography variant="subheading" color="secondary">Cheque Totals</Typography>
					<Typography variant="subheading" color="secondary">{toMoney(summary.chequeTotals)}</Typography>
				</div>
			</div>
		);
	}

	// ------ Details

	handleChangeDetail = (event: any) => {
		const conveyance = Object.assign({}, this.state.conveyance);
		const changed = Object.assign({}, this.state.changed);
		conveyance[event.target.name] = convert(event.target.value, event.target.type);
		changed.detail = true;
		this.setState({ conveyance, changed });
	}
	handleExpandDetail = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.detail = !expanded.detail;
		this.setState({ expanded });
	}
	handleUndoDetail = () => {
		const conveyance = replaceIn(this.state.conveyance, this.props.conveyance || data.conveyance.detail, getPropNameList(settlementDetailFields))
		const changed = Object.assign({}, this.state.changed);
		changed.detail = false;		
		this.setState({ conveyance, changed });
	}
	handleSaveDetail = () => {
		const names = getPropNameList(settlementDetailFields);
		const values = getPropNameValues(this.state.conveyance, names);
		console.log(values);
		const snackbarOpen = true;
		const snackbarMessage = "Details saved";
		const changed = Object.assign({}, this.state.changed);
		changed.detail = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ------ Price & Deposit

	handleExpandPrice = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.price = !expanded.price;
		this.setState({ expanded });
	}
	handleChangePrice = (event: any) => {
		const conveyance = Object.assign({}, this.state.conveyance);
		const changed = Object.assign({}, this.state.changed);
		conveyance[event.target.name] = convert(event.target.value, event.target.type);
		changed.price = true;
		this.setState({ conveyance, changed });
	}
	handleUndoPrice = () => {
		const names = getPropNameList(settlementPriceFields);
		const conveyance = replaceIn(this.state.conveyance, this.props.conveyance || data.conveyance.detail, names);
		const changed = Object.assign({}, this.state.changed);
		changed.price = false;
		this.setState({ conveyance, changed });
	}
	handleSavePrice = () => {
		const names = getPropNameList(settlementPriceFields);
		const values = getPropNameValues(this.state.conveyance, names);
		console.log(values);
		const snackbarOpen = true;
		const snackbarMessage = "Price saved";
		const changed = Object.assign({}, this.state.changed);
		changed.price = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ------ Release

	handleExpandRelease = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.release = !expanded.release;
		this.setState({ expanded });
	}
	handleChangeRelease = (event: any) => {
		const settlement = Object.assign({}, this.state.settlement);
		const changed = Object.assign({}, this.state.changed);
		settlement[event.target.name] = convert(event.target.value, event.target.type);
		changed.release = true;
		this.setState({ settlement, changed });
	}
	handleUndoRelease = () => {
		const names = getPropNameList(settlementReleaseFields);
		const settlement = replaceIn(this.state.conveyance, this.props.settlement || data.conveyance.settlement, names);
		const changed = Object.assign({}, this.state.changed);
		changed.release = false;		
		this.setState({ settlement, changed });
	}
	handleSaveRelease = () => {
		const names = getPropNameList(settlementReleaseFields);
		const values = getPropNameValues(this.state.settlement, names);
		console.log(values);
		const snackbarOpen = true;
		const snackbarMessage = "Release saved";
		const changed = Object.assign({}, this.state.changed);
		changed.release = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ------ Rate and Charges

	handleExpandRate = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.rate = !expanded.rate;
		this.setState({ expanded });
	}
	handleChangeRate= (event: any) => {
		const settlement = Object.assign({}, this.state.settlement);
		const changed = Object.assign({}, this.state.changed);
		settlement[event.target.name] = convert(event.target.value, event.target.type);
		changed.rate = true;
		this.setState({ settlement, changed });
	}
	handleUndoRate = () => {
		const names = getPropNameList(settlementRateFields);
		const settlement = replaceIn(this.state.settlement, this.props.settlement || data.conveyance.settlement, names);
		const changed = Object.assign({}, this.state.changed);
		changed.rate = false;		
		this.setState({ settlement, changed });
	}
	handleSaveRate = () => {
		const names = getPropNameList(settlementRateFields);
		const values = getPropNameValues(this.state.settlement, names);
		console.log(values);
		const snackbarOpen = true;
		const snackbarMessage = "Rate saved";
		const changed = Object.assign({}, this.state.changed);
		changed.rate = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ------ Water ( Tiered, Non Tiered, No Calculation )

	handleExpandWater = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.water = !expanded.water;
		this.setState({ expanded });
	}
	handleChangeWater = (event: any) => {
		const settlement = Object.assign({}, this.state.settlement);
		const changed = Object.assign({}, this.state.changed);
		settlement[event.target.name] = convert(event.target.value, event.target.type);
		changed.water = true;
		this.setState({ settlement, changed });
	}
	handleChangeWaterType = (event: any, value: any) => {
		const settlement = Object.assign({}, this.state.settlement);
		const changed = Object.assign({}, this.state.changed);
		settlement.waterCalculationType = value;
		changed.water = true;
		this.setState({ settlement, changed });
	}
	handleUndoWater = () => {
		const names = getPropNameList(settlementWaterTieredFields);
		const settlement = replaceIn(this.state.settlement, this.props.settlement || data.conveyance.settlement, names);
		const changed = Object.assign({}, this.state.changed);
		changed.water = false;		
		this.setState({ settlement, changed });
	}
	handleSaveWater = () => {
		const names = getPropNameList(settlementWaterTieredFields);
		const values = getPropNameValues(this.state.settlement, names);
		console.log(values);
		const snackbarOpen = true;
		const snackbarMessage = "Water saved";
		const changed = Object.assign({}, this.state.changed);
		changed.water = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}
	renderWaterHeader = (type: number) => {
		return (
			<Paper>
				<Tabs value={type || 3} onChange={this.handleChangeWaterType} centered  >
					<Tab value={1} label="Use Tiered Water Calculation" />
					<Tab value={2} label="Use Non Tiered Water Calcuation" />
					<Tab value={3} label="No Water Calculation Required" />
				</Tabs>
			</Paper>
		);
	}
	renderWaterContent = (type: number) => {
		switch (type) {
			case 1:
				return <RowGroup fields={settlementWaterTieredFields} />;
			case 2:
				return <RowGroup fields={settlementWaterNonTieredFields} />;
			case 3:
			default:
				return <RowGroup fields={settlementWaterTieredFields} />;
		}
	}

	// ----- Body Corp - Admin

	handleExpandBcAdmin = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.bcadmin = !expanded.bcadmin;
		this.setState({ expanded });
	}
	handleChangeBcAdmin = (event: any, item: any, type: string) => {

		const settlement = Object.assign({}, this.state.settlement);
		const changed = Object.assign({}, this.state.changed);
		settlement[event.target.name] = convert(event.target.value, event.target.type);
		changed.bcadmin = true;
		this.setState({ settlement, changed });
	}
	handleEditBcAdmin = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.bcadmin = !expanded.bcadmin;
		this.setState({ expanded });
	}

	handleUndoBcAdmin = () => {
		const names = getPropNameList(settlementBcAdminFields);
		const settlement = replaceIn(this.state.settlement, this.props.settlement || data.conveyance.settlement, names);
		const changed = Object.assign({}, this.state.changed);
		changed.bcadmin = false;		
		this.setState({ settlement, changed });
	}

	handleSaveBcAdmin = () => {
		const names = getPropNameList(settlementBcAdminFields);
		const values = getPropNameValues(this.state.settlement, names);
		console.log(values);
		const snackbarOpen = true;
		const snackbarMessage = "Body Corp - Admin saved";
		const changed = Object.assign({}, this.state.changed);
		changed.bcamdin = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ----- Body Corp - Sinking

	handleExpandBcSinking = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.bcsinking = !expanded.bcsinking;
		this.setState({ expanded });
	}
	handleChangeBcSinking = (event: any, item: any, type: string) => {

		const settlement = Object.assign({}, this.state.settlement);
		const changed = Object.assign({}, this.state.changed);
		settlement[event.target.name] = convert(event.target.value, event.target.type);
		changed.bcsinking = true;
		this.setState({ settlement, changed });
	}
	handleEditBcSinking = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.bcsinking = !expanded.bcsinking;
		this.setState({ expanded });
	}

	handleUndoBcSinking = () => {
		const names = getPropNameList(settlementBcSinkingFields);
		const settlement = replaceIn(this.state.settlement, this.props.settlement || data.conveyance.settlement, names);
		const changed = Object.assign({}, this.state.changed);
		changed.bcsinking = false;		
		this.setState({ settlement, changed });
	}

	handleSaveBcSinking = () => {
		const names = getPropNameList(settlementBcSinkingFields);
		const values = getPropNameValues(this.state.settlement, names);
		console.log("to save: ", values);
		const snackbarOpen = true;
		const snackbarMessage = "Body Corp - Sinking saved";
		const changed = Object.assign({}, this.state.changed);
		changed.bcsinking = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ----- Body Corp - Insurance

	handleExpandBcInsurance = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.bcinsurance = !expanded.bcinsurance;
		this.setState({ expanded });
	}
	handleChangeBcInsurance = (event: any) => {

		const settlement = Object.assign({}, this.state.settlement);
		const changed = Object.assign({}, this.state.changed);
		settlement[event.target.name] = convert(event.target.value, event.target.type);
		changed.bcinsurance = true;
		this.setState({ settlement, changed });
	}
	handleEditBcInsurance = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.bcinsurance = !expanded.bcinsurance;
		this.setState({ expanded });
	}

	handleUndoBcInsurance = () => {
		const names = getPropNameList(settlementBcInsuranceFields);
		const settlement = replaceIn(this.state.settlement, this.props.settlement || data.conveyance.settlement, names);
		const changed = Object.assign({}, this.state.changed);
		changed.bcinsurance = false;		
		this.setState({ settlement, changed });
	}

	handleSaveBcInsurance = () => {
		const names = getPropNameList(settlementBcInsuranceFields);
		const values = getPropNameValues(this.state.settlement, names);
		console.log("to save: ", values);
		const snackbarOpen = true;
		const snackbarMessage = "Body Corp - Insurance saved";
		const changed = Object.assign({}, this.state.changed);
		changed.bcinsurance = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ----- Body Corp - Lot Entitlement

	handleExpandBcLotEntitlement = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.bclotentitlement = !expanded.bclotentitlement;
		this.setState({ expanded });
	}
	handleChangeBcLotEntitlement = (event: any, item: any, type: string) => {

		const settlement = Object.assign({}, this.state.settlement);
		const changed = Object.assign({}, this.state.changed);
		settlement[event.target.name] = convert(event.target.value, event.target.type);
		changed.bclotentitlement = true;
		this.setState({ settlement, changed });
	}
	handleEditBcLotEntitlement = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.bclotentitlement = !expanded.bclotentitlement;
		this.setState({ expanded });
	}

	handleUndoBcLotEntitlement = () => {
		const names = getPropNameList(settlementBcLotEntitlementFields);
		const settlement = replaceIn(this.state.settlement, this.props.settlement || data.conveyance.settlement, names);
		const changed = Object.assign({}, this.state.changed);
		changed.bclotentitlement = false;		
		this.setState({ settlement, changed });
	}

	handleSaveBcLotEntitlement = () => {
		const names = getPropNameList(settlementBcLotEntitlementFields);
		const values = getPropNameValues(this.state.settlement, names);
		console.log("to save: ", values);
		const snackbarOpen = true;
		const snackbarMessage = "Body Corp - Lot Entitlement saved";
		const changed = Object.assign({}, this.state.changed);
		changed.bclotentitlement = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
	}

	// ----- Adjustments

	handleExpandAdjustments = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.adjustment = !expanded.adjustment;
		this.setState({ expanded });
	}

	handleEditAdjustments = () => {
		const editing = Object.assign({}, this.state.editing);
		editing.adjustment = !editing.adjustment;
		this.setState({ editing });
	}

	handleChangeAdjustments = (adjustments: Array<any>) => {
		this.setState({ adjustments });
	}

	handleSaveAdjustments = (adjustments: Array<any>) => {
		console.log("to save: ", adjustments);
		const snackbarOpen = true;
		const snackbarMessage = "Adjustments saved";
		const changed = Object.assign({}, this.state.changed);
		changed.adjustment = false;		
		this.setState({
			changed,
			snackbarOpen,
			snackbarMessage
		});
		return true;
	}

	getAdjustmentHeadline = () => {
		let s = "";
		this.state.adjustments.forEach((r) => {
			s += ", " + r.detail;
		});
		return s.substring(2);
	}

	// ----- Cheques

	handleExpandCheques = () => {
		const expanded = Object.assign({}, this.state.expanded);
		expanded.cheque = !expanded.cheque;
		this.setState({ expanded });
	}

	handleEditCheques = () => {
		const editing = Object.assign({}, this.state.editing);
		editing.cheque = !editing.cheque;
		this.setState({ editing });
	}

	handleChangeCheque = (i: number, cheque: any) => {
		const cheques = Object.assign([], this.state.changed);
		cheques[i] = cheque;
		this.setState({ cheques });
	}

	handleChangeCheques = (cheques: Array<any>) => {
		this.setState({ cheques });
	}

	handleSaveCheques = (cheques: Array<any>) => {
		console.log("cheques saved", cheques)
		const snackbarOpen = true;
		const snackbarMessage = "Cheques saved";
		const changed = Object.assign({}, this.state.changed);
		changed.adjustment = false;		
		this.setState({
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
		const { classes } = this.props;
		const { conveyance, settlement, adjustments, cheques } = this.state;
		const settlementWaterFields = 
			settlement.waterCalculationType === 1 ? settlementWaterTieredFields :
			settlement.waterCalculationType === 2 ? settlementWaterNonTieredFields : [];		
		const summary = calcSummary(conveyance, settlement, adjustments, cheques);

        return (
            <MuiThemeProvider theme={theme1}>
				<AppBar
					slot="appbar"
					position="sticky"
					color="primary"
					changed={this.isChanged()}
					mainButton={<MenuIcon />}
					title="Conveyances"
					headline="Settlement"
					editable
					editAll={this.state.editAll}
					expandable
					expandAll={this.state.expandAll}
					onExpand={this.handleToggleExpandAll}
					onEdit={this.handleToggleEditAll}
					onSave={this.handleSaveAll}
					onUndo={this.handleUndoAll}
				/>

				<div className={classes.root}>
					<div className={classes.fix}>
						<Form
							slot="preview"
							expanded={this.state.expanded.preview}
							title="Preview"
							color="secondary"
							header={this.renderPreview(summary)}
							values={summary}
							onExpand={this.handleExpandPreview}
							onChangeAll={this.handleChangePreview}
						/>

						<Collection
							collection={cheques}
							view="form"
							editAll={this.state.editAll || this.state.editing.cheques}
							expandAll={this.state.expandAll || this.state.expanded.cheque}
							addable
							editable
							expandable
							onChange={this.handleChangeCheques}
							onSave={this.handleSaveCheques}
							onExpand={this.handleExpandCheques}
							onEdit={this.handleEditCheques}
						>
							<AppBar
								slot="appbar"
								variant="dense"
								color="secondary"
								title="Cheques"
								noBoxShadow
							/>
							<Form
								slot="form"
								contents={[
									<RowGroup key={0} fields={settlementChequeFields} />
								]}
							/>
						</Collection>
					</div>

					<div className={classes.grow}>
						<Form
							slot="detail"
							actionable
							changed={this.state.changed.detail}
							editable
							editing={this.state.editing.detail}
							expanded={this.state.expanded.detail}
							title="Settlement Details"
							color="secondary"
							headline={moment(conveyance.settlementDate).format("DD/MM/YYYY")}
							subheading={["settlmentTime"]}
							contents={[
								<ColGroup key={0} fields={settlementDetailFields} />
							]}
							values={conveyance}
							onChange={this.handleChangeDetail}
							onExpand={this.handleExpandDetail}
							onSave={this.handleSaveDetail}
							onUndo={this.handleUndoDetail}
						/>

						<Form
							slot="price"
							actionable
							changed={this.state.changed.price}
							editable
							editing={this.state.editing.price}
							expanded={this.state.expanded.price}
							headline={["contractPrice"]}
							title="Price and Deposit"
							color="secondary"
							contents={[
								<RowGroup key={0} fields={settlementPriceFields} />
							]}
							values={conveyance}
							onChange={this.handleChangePrice}
							onExpand={this.handleExpandPrice}
							onSave={this.handleSavePrice}
							onUndo={this.handleUndoPrice}
						/>

						<Form
							slot="release"
							actionable
							changed={this.state.changed.release}
							editable
							editing={this.state.editing.release}
							expanded={this.state.expanded.release}
							headline={["registrationReleaseFee", "registrationReleaseNumber"]}
							title="Release(s)"
							color="secondary"
							contents={[
								<RowGroup key={0} fields={settlementReleaseFields} />
							]}
							values={settlement}
							onChange={this.handleChangeRelease}
							onExpand={this.handleExpandRelease}
							onUndo={this.handleUndoRelease}
							onSave={this.handleSaveRelease}
						/>

						<Form
							slot="rate"
							title="Rates / Charges"
							color="secondary"
							actionable
							changed={this.state.changed.rate}
							editable
							editing={this.state.editing.rate}
							expanded={this.state.expanded.rate}
							headline={["rateAmount"]}
							subheading={["rateAdjustment"]}
							contents={[
								<RowGroup key={0} fields={settlementRateFields} />
							]}
							values={settlement}
							onChange={this.handleChangeRate}
							onExpand={this.handleExpandRate}
							onUndo={this.handleUndoRate}
							onSave={this.handleSaveRate}
						/>

						<Form
							slot="water"
							title="Water"
							color="secondary"
							actionable
							changed={this.state.changed.water}
							editable
							editing={this.state.editing.water}
							expanded={this.state.expanded.water}
							headline={["waterCalculationType"]}
							// subheading={["rateAdjustment"]}
							header={this.renderWaterHeader(settlement.waterCalculationType)}
							contents={[
								<RowGroup key={0} fields={settlementWaterFields} />
							]}
							values={settlement}
							onChange={this.handleChangeWater}
							onExpand={this.handleExpandWater}
							onUndo={this.handleUndoWater}
							onSave={this.handleSaveWater}
						/>

						<Form
							slot="bcadmin"
							title="Body Corp - Admin"
							actionable
							changed={this.state.changed.bcadmin}
							editable
							editing={this.state.editing.bcadmin}
							expanded={this.state.expanded.bcadmin}
							// headline={["propertyName"]}
							color="secondary"
							contents={[
								<RowGroup key={0} fields={settlementBcAdminFields} />
							]}
							values={settlement}
							onChange={this.handleChangeBcAdmin}
							onExpand={this.handleExpandBcAdmin}
							onUndo={this.handleUndoBcAdmin}
							onSave={this.handleSaveBcAdmin}
						/>

						<Form
							slot="bcsinking"
							title="Body Corp - Sinking"
							actionable
							changed={this.state.changed.bcsinking}
							editable
							editing={this.state.editing.bcsinking}
							expanded={this.state.expanded.bcsinking}
							// headline={["propertyName"]}
							color="secondary"
							contents={[
								<RowGroup key={0} fields={settlementBcSinkingFields} />
							]}
							values={settlement}
							onChange={this.handleChangeBcSinking}
							onExpand={this.handleExpandBcSinking}
							onUndo={this.handleUndoBcSinking}
							onSave={this.handleSaveBcSinking}
						/>

						<Form
							slot="bcinsurance"
							title="Body Corp - Insurance"
							actionable
							changed={this.state.changed.bcinsurance}
							editable
							editing={this.state.editing.bcinsurance}
							expanded={this.state.expanded.bcinsurance}
							// headline={["propertyName"]}
							color="secondary"
							contents={[
								<RowGroup key={0} fields={settlementBcInsuranceFields} />
							]}
							values={settlement}
							onChange={this.handleChangeBcInsurance}
							onExpand={this.handleExpandBcInsurance}
							onUndo={this.handleUndoBcInsurance}
							onSave={this.handleSaveBcInsurance}
						/>

						<Form
							slot="bclotentitlement"
							title="Body Corp - Lot Entitlement"
							actionable
							changed={this.state.changed.bclotentitlement}
							editable
							editing={this.state.editing.bclotentitlement}
							expanded={this.state.expanded.bclotentitlement}
							// headline={["propertyName"]}
							color="secondary"
							contents={[
								<RowGroup key={0} fields={settlementBcLotEntitlementFields} />
							]}
							values={settlement}
							onChange={this.handleChangeBcLotEntitlement}
							onExpand={this.handleExpandBcLotEntitlement}
							onUndo={this.handleUndoBcLotEntitlement}
							onSave={this.handleSaveBcLotEntitlement}
						/>

						<Collection
							collection={adjustments}
							view="form"
							editAll={this.state.editAll || this.state.editing.adjustment}
							expandAll={this.state.expandAll || this.state.expanded.adjustment}
							addable
							editable
							expandable
							onChange={this.handleChangeAdjustments}
							onSave={this.handleSaveAdjustments}
							onExpand={this.handleExpandAdjustments}
							onEdit={this.handleEditAdjustments}
						>
							<AppBar
								slot="appbar"
								variant="dense"
								color="secondary"
								title="Other Adjustments"
								headline={this.getAdjustmentHeadline()}
								noBoxShadow
							/>
							<Form
								slot="form"
								contents={[
									<RowGroup key={0} fields={settlementAdjustmentProRataFields} />
								]}
							/>
						</Collection>
					</div>
				</div>

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
