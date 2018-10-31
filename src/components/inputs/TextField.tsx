import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import styles from "./style";
import { IProps, IState } from "./TextField.d";

export default withStyles(styles)(
class extends React.Component<IProps & TextFieldProps, IState> {
	private input: any;
	constructor(props: any) {
		super(props);
		this.state = {
			editing: props.editing || false,
			controlled: props.controlled || true
		};
	}

	// componentWillReceiveProps(nextProps: any) {
	// 	this.setState({
	// 		value: nextProps.value || "",
	// 		editing: this.state.uncontrolled ? this.state.editing : nextProps.editing
	// 	});
	// }
	static getDerivedStateFromProps(props: any, state: any) {
		if (!state.controlled || state.editing === props.editing) return null;
		return {
			editing: props.editing
		};
	}

	inputRef = (el: any) => this.input = el;

	handleFocus = () => {
		this.setState({ editing: true, controlled: false }, () => {
			this.input.focus();
		});
	}

	handleBlur = (event: any) => {
		event.persist();
		this.setState({ editing: this.props.editing, controlled: true }, () => {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(event);
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

	// handleChange = (event: any) => {
	// 	event.persist();
	// 	const value = event.target.value;
	// 	if (value === this.state.value) {
	// 		return; // no change
	// 	}
	// 	this.setState({ value }, () => {
	// 		if (typeof this.props.onChange === "function") {
	// 			this.props.onChange(event);
	// 		}
	// 	});
	// }

	render() {
		// console.log(this.props);
		// console.log(this.state);
		const { adornment, adornmentPosition, editable, value, onChange } = this.props;
		const { editing } = this.state;
		const inputRef = this.props.inputRef || this.inputRef || "input";
		const props = {...this.props};
		delete props.editable;
		delete props.editing;
		delete props.adornment;
		delete props.adornmentPosition;

		let inputProps = {};
		if (!editable || !editing) {
			inputProps = Object.assign(inputProps, { 
				disableUnderline: true 
			});
		}
		if (adornment) {
			if (adornmentPosition === "end") {
				inputProps = Object.assign(inputProps, { 
					endAdornment: <InputAdornment position = "end">{adornment}</InputAdornment>
				});
			} else {
				inputProps = Object.assign(inputProps, { 
					startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>
				});
			}
		}

		// read only
		if (!editable) {
			return (
				<TextField {...props}
					disabled
					InputProps={inputProps}
					helperText={this.props.error}
					error={!!this.props.error}
					FormHelperTextProps={{  error: !this.props.error }}
					margin="normal"
				/>
			);
		}
		// editable, but not editing
		if (!editing) {
			return (
				<TextField {...props}
					inputRef={inputRef}
					InputProps={inputProps}
					helperText={this.props.error}
					error={!!this.props.error}
					FormHelperTextProps={{  error: !this.props.error }}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					margin="normal"
				/>
			);
		}
		// editing
		return (
			<TextField {...props}
				value={value}
				inputRef={inputRef}
				InputProps={inputProps}
				helperText={this.props.error}
				error={!!this.props.error}
				FormHelperTextProps={{  error: !this.props.error }}
				onKeyPress={this.handleKeyPress}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onChange={onChange}
				margin="normal"
				/>
		);
	}
})


