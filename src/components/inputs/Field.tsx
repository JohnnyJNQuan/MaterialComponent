import * as React from "react";
import * as moment from "moment";
import { Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { AddressField, Autocomplete, CheckboxField, DateField, RadioGroup, SelectField, TextField, SwitchField } from ".";
import { IProps } from "./Field.d";
import styles from "./style";
import { getValue } from "../utility";

const Field = ({ classes, editable, editing, error, errorText, field, value, values, onChange }: IProps) => {
	const computedStyle = { ...field.style, width: field.width || "100%" };
	let helperText = field.errorText;
	if (field && field.required === true && !value) {
		if (field && field.required === true) {
			helperText = "required";
		}
		if (error) {
			helperText = errorText;
		}
	}
	const className = classNames(classes, field.className);
	const safeValue = value || "";
	let input = <div />;
	const computedlabel = getValue(field.label, values);	// field.label can be function
	let computedEditable = editable;
	if (field.editable) {
		if (typeof(field.editable) === "function") {
			computedEditable = computedEditable && field.editable();
		}
		else {
			computedEditable = computedEditable && field.editable;
		}
	}
	// console.log(field.editable);
	// console.log(editable);
	// console.log(computedEditable);
	switch (field.type) {
		case "custom":
			input = field.element;
			break;
		case "action":
			input = <Button 
				variant={field.variant} 
				color={field.color} 
				className={className}
				>
				{computedlabel}
			</Button>;
		case "select":
			input = <SelectField
				addable={field.addable}
				displayEmpty
				editable={computedEditable}
				editing={editing}
				fullWidth
				items={field.items}
				itemConfig={field.itemConfig}
				label={computedlabel}
				name={field.name}
				onChange={onChange}
				style={field.style}
				value={safeValue}
				required={field.required}
				classes={classes}
				fields={field.newFields}
				onSave={field.onSave}
			/>;
			break;
		case "date":
			// const d = moment(value);
			// const ds = d.isValid ? d.format("YYYY-MM-DD") : "";
			input = <DateField
				label={computedlabel}
				type={field.type}
				name={field.name}
				value={moment(value).format("YYYY-MM-DD")}
				onChange={onChange}
				editable={computedEditable}
				editing={editing}
				error={error}
				helperText={helperText}
				fullWidth={field.fullWidth || !field.width}
				required={field.required}
			/>;
			break;
		case "number":
		case "text":
			input = <TextField
				label={computedlabel}
				type={field.type}
				name={field.name}
				value={safeValue}
				onChange={onChange}
				editable={computedEditable}
				editing={editing}
				style={computedStyle}
				error={error}
				helperText={helperText}
				// inputRef={inputRef}
				fullWidth={field.fullWidth || !field.width}
				width={field.width}
				required={field.required}
				multiline={field.multiline}
				adornment={field.adornment}
				adornmentPosition={field.adornmentPosition}
			/>;
			break;
		case "checkbox":
			input = <CheckboxField
				label={computedlabel}
				name={field.name}
				onChange={onChange}
				checked={value || false}
				value={field.name}
				editable={computedEditable}
				editing={editing}
				style={computedStyle}
				className={className}
			/>;
			break;
		case "radio":
			input = <RadioGroup
				label={computedlabel}
				name={field.name}
				items={field.items}
				onChange={onChange}
				value={safeValue}
				editable={computedEditable}
				editing={editing}
				className={className}
				row={field.row}
			/>;
			break;
		case "switch":
			input = <SwitchField
				label={computedlabel}
				name={field.name}
				onChange={onChange}
				checked={value || false}
				value={field.name}
				editable={computedEditable}
				editing={editing}
				className={className}
			/>;
			break;
		case "address":
			input = <AddressField
				label={computedlabel}
				name={field.name}
				values={value}
				group={field.group}
				editable={computedEditable}
				editing={editing}
				onChange={onChange}
				className={className}
				style={computedStyle}
			/>;
			break;
		case "autocomplete":
			input = <Autocomplete
				label={computedlabel}
				name={field.name}
				onChange={onChange}
				checked={value || false}
				value={field.name}
				editable={editable}
				editing={editing}
				className={className}
			/>;
			break;
		default:
			input = <span style={computedStyle} />
			break;
	}
	return input;
};

export default withStyles(styles)(Field);