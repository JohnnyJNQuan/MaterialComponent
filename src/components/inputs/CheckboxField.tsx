import * as React from "react";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { FormControlLabel } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';
import styles from "./style";
import { IProps, IState } from "./CheckboxField.d";

const CheckboxField = withStyles(styles)(
class extends React.Component<IProps & CheckboxProps, IState> {
	private input: any;
	constructor(props: any) {
		super(props);
		this.state = {
			checked: props.checked,
			editing: props.editing,
			controlled: props.controlled || true
		};
    }

	static getDerivedStateFromProps(props: IProps, state: IState) {
		if (!state.controlled || state.editing === props.editing || state.checked === props.checked) return null;
		return {
			editing: props.editing,
			checked: props.checked
		};
	}

	inputRef = (el: any) => this.input = el;

	handleBlur = (event: any, checked: boolean) => {
		event.persist();
		this.setState({ editing: this.props.editing, controlled: true }, () => {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(event, checked);
			}
		});
	}

	handleFocus = (event: any) => {
		this.setState({ editing: true, controlled: false }, () => {
			this.input.focus();
		});
	}

	handleKeyPress = (event: any, checked: boolean) => {
		if (this.props.onKeyPress) {
			this.props.onKeyPress(event);
		} else {
			if (event.key === "Enter") {
				this.handleBlur(event, checked);
			}
		}
	}

	handleChange = (event: any, checked: boolean) => {
		event.persist();
		this.setState({ checked }, () => {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(event, checked);
			}
		});
	}

	render() {
        const { editable, label, name } = this.props;
		const { editing, checked } = this.state;

    	// read only (diabled)
		if (!editable) {
			return (
                <FormControlLabel
                    control={<Checkbox checked={checked} disabled />}
                    label={label}
                />
			);
		}
		// editable, but not in editing
		if (!editing) {
			return (
                <FormControlLabel style={{width: "100%"}}
                    // control={<Checkbox checked={checked} onChange={this.handleChange} />}
                    control={<Checkbox checked={checked} name={name} onChange={this.handleChange} />}
                    label={label}
                />
			);
		}
        // editing
        return (
            <FormControlLabel style={{width: "100%"}}
                control={<Checkbox checked={checked} name={name} onChange={this.handleChange} />}
                label={label}
            />
        );
	}
}
)
export default CheckboxField;