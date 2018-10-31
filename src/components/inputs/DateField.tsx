import * as React from "react";
import * as moment from "moment";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import styles from "./style";
import { IProps, IState } from "./DateField.d";

export default withStyles(styles)(
class extends React.Component<IProps & TextFieldProps, IState> {
	private input: any;
	constructor(props: any) {
		super(props);
		this.state = {
            value: moment(props.value).format("YYYY-MM-DD"),  // must be yyyy-MM-dd format
			editing: props.editing || false,
			controlled: props.controlled || true
		};
    }

	static getDerivedStateFromProps(props: any, state: any) {
        if (!state.controlled) return null;

        let changeProps = {};
        if (moment(state.value).format("YYYY-MM-DD") !== moment(props.value).format("YYYY-MM-DD")) {
            changeProps = Object.assign(changeProps, { value: moment(props.value).format("YYYY-MM-DD") });
        }
		if (state.editing !== props.editing) {
            changeProps = Object.assign(changeProps, { editing: props.editing });
		}
		
		if (Object.keys(changeProps).length === 0 && changeProps.constructor === Object) return null;
		return { props, ...changeProps };
	}

    inputRef = (el: any) => this.input = el;

	handleFocus = () => {
		this.setState({ editing: true, controlled: false }, () => {
			this.input.focus();
		});
	}

	handleBlur = (event: any) => {
		event.persist();
		const value = event.target.value;
		this.setState({ 
			controlled: true,
			editing: this.props.editing, 
			value
		}, () => {
			if (typeof this.props.onChange === "function") {
				event.target = {
					name: this.props.name,
					type: this.props.type,
					value: moment(value).toISOString()
				}
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

	handleChange = (event: any) => {
		event.persist();
		const value = event.target.value;
		if (value === this.state.value) {
			return; // no change
		}
		this.setState({ value });
		// this.setState({ value }, () => {
		// 	if (typeof this.props.onChange === "function") {
		// 		const e = Object.assign({}, event);
		// 		const target = {
		// 			name: this.props.name,
		// 			type: this.props.type,
		// 			value: moment(value).toISOString()
		// 		}
		// 		e.target = target;
		// 		// console.log(e);
		// 		this.props.onChange(e);
		// 	}
		// });
	}

	render() {
		// console.log(this.props);
		// console.log(this.state);
		const { editable } = this.props;
		const { editing, value } = this.state;
		const inputRef = this.props.inputRef || this.inputRef || "input";
		const props = {...this.props};
		delete props.editable;
		delete props.editing;

		// const { classes } = this.props;

		// read only
		if (!editable) {
			return (
				<TextField 
					{...props}
					disabled
					margin="normal"
					InputProps={{ disableUnderline: true }}
					helperText={this.props.error}
					error={!!this.props.error}
					FormHelperTextProps={{  error: !this.props.error }}
					value={value}
				/>
			);
		}
		// editable, but not editing
		if (!editing) {
			return (
				<TextField 
					{...props}
					margin="normal"
					inputRef={inputRef}
					InputProps={{ disableUnderline: true }}
					helperText={this.props.error}
					error={!!this.props.error}
					FormHelperTextProps={{  error: !this.props.error }}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
                     value={value}
                    onChange={this.handleChange}
				/>
			);
		}
		// editing
		return (
			<TextField 
				{...props}
				margin="normal"
				inputRef={inputRef}
				helperText={this.props.error}
				error={!!this.props.error}
				FormHelperTextProps={{  error: !this.props.error }}
				onKeyPress={this.handleKeyPress}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onChange={this.handleChange}
                value={value}
            />
		);
	}
})


