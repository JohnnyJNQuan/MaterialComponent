import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Select, { SelectProps } from "@material-ui/core/Select";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import { IconButton } from '@material-ui/core';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import classNames from 'classnames';
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./style";
import { IProps, IState } from "./SelectField.d";
import SelectNew from "./SelectNew";

const SelectField = withStyles(styles)(
class extends React.Component<IProps & SelectProps, IState> {
	private input: any;
	constructor(props: any) {
		super(props);
		this.state = {
			// value: props.value || "",
			editing: props.editing || false,
			controlled: true,
			items: Object.assign([], props.items)
		};
    }

	static getDerivedStateFromProps(props: any, state: any) {
		if (!state.controlled) return null;

		let changeProps = {};
		if (state.editing !== props.editing) {
			changeProps = Object.assign(changeProps, {editing: props.editing});
		}
		if (state.item !== props.item) {
			changeProps = Object.assign(changeProps, {items: props.items});
		}

		if (changeProps.constructor === Object && Object.keys(changeProps).length === 0) return null;
		return { props, ...changeProps };
	}

	inputRef = (el: any) => this.input = el;

	getItems = () => {
		const itemConfig = this.props.itemConfig || { text: "text", value: "value" };
		const items: any = [];
		if (this.props.displayEmpty) {
			items.push(<MenuItem value="" key={-1}><em>None</em></MenuItem>);
		}
		if (this.state.items) {
			this.state.items.forEach((item: any, i: number) => {
				items.push(
					<MenuItem key={i} value={item[itemConfig.value]} >
						{item[itemConfig.text]}
					</MenuItem>);
			});
		}
		return items;
	}

	handleFocus = (event: any) => {
		this.setState({ editing: true, controlled: false }, () => {
			this.input.focus();
		});
	}

	handleBlur = (event: any) => {
		// event.persist();
		// this.setState({ editing: this.props.editing, controlled: true }, () => {
		// 	if (typeof this.props.onChange === "function" && event.target.value !== this.state.value) {
		// 		event = {
		// 			target: {
		// 				name: this.props.name,
		// 				type: this.props.type,
		// 				value: this.state.value
		// 			}
		// 		};
		// 		this.props.onChange(event, null);
		// 	}
		// });
		event.persist();
		this.setState({ editing: this.props.editing, controlled: true }, () => {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(event, null);
			}
		});
	}

	handleKeyPress = (event: any) => {
		if (this.props.onKeyPress) {
			this.props.onKeyPress(event);
		} else {
			if (event.key === "Enter") {
				this.handleBlur(event);
			}
		}
	}

	// handleChange = (event: any, child: any) => {
	// 	console.log(event.target);
	// 	console.log(child);
	// 	event.persist();
    //     const value = event.target.value;
	// 	if (value === this.state.value) {
	// 		return; // no change
    //     }
	// 	this.setState({ value }, () => {
	// 		if (typeof this.props.onChange === "function") {
	// 			this.props.onChange(event, child);
	// 		}
	// 	});
	// }

	handleSave = (newItem: any) => {
		const { items } = this.state;
		items.push(newItem);
		this.setState({ items });
	}

	render() {
		const { editable, label, name, id, fullWidth, value } = this.props;
		const { onChange } = this.props;
		const { editing } = this.state;
		const { addable, fields, onSave } = this.props;
		const inputRef = this.props.inputRef || this.inputRef || "input";
        const props = {...this.props};
        delete props.editable;
        delete props.editing;

    	// read only (diabled)
		if (!editable) {
			return (
				<FormControl disabled fullWidth={fullWidth} margin="normal">
					<InputLabel htmlFor={name}>{label}</InputLabel>
					<Select
						disabled
						input={<Input disableUnderline />}
						value={value}
						onChange={onChange}
					>
						{this.getItems()}
					</Select>
				</FormControl>
			);
		}
		// editable, but not in editing
		if (!editing) {
			return (
				<FormControl fullWidth={fullWidth} margin="normal">
					<InputLabel htmlFor={name}>{label}</InputLabel>
					<Select
						input={<Input name={name} id={id} disableUnderline />}
						// inputProps={this.props.style}
						inputRef={inputRef}
						value={value}
						onChange={onChange}
					>
						{this.getItems()}
					</Select>
				</FormControl>
			);
		}
        // editing
		return (
			<div style={{display: "flex"}}>
				<FormControl fullWidth={fullWidth} margin="normal">
					<InputLabel htmlFor={name}>{label}</InputLabel>
					<Select
						value={value}
						input={<Input name={name} id={id} />}
						inputProps={{ name, id }}
						// fullWidth={fullWidth}
						inputRef={inputRef}
						onChange={onChange}
					>
						{this.getItems()}
					</Select>
				</FormControl>
				{addable && 
					<SelectNew 
						fields={fields} 
						onSave={onSave} 
					/>
				}
				{/* <IconButton style={{ marginTop: 8 }}><ExpandMoreIcon /></IconButton> */}
			</div>

		);
	}
}
)
export default SelectField;
// export default withStyles(styles)(SelectField);
