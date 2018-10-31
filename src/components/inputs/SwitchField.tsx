import * as React from "react";
import Switch, { SwitchProps } from "@material-ui/core/Switch";
import { FormControlLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";
import { IProps, IState } from "./SwitchField.d";

const SwitchField = withStyles(styles)(
class extends React.Component<IProps & SwitchProps, IState> {
	private input: any;
	constructor(props: any) {
		super(props);
		this.state = {
			editing: props.editing,
			controlled: false,
			checked: props.checked
		};
    }

	static getDerivedStateFromProps(props: IProps, state: IState) {
		if (!state.controlled || state.editing === props.editing) return null;
		return {
			editing: props.editing,
			// checked: props.checked
		};
	}

	inputRef = (el: any) => this.input = el;

	handleFocus = (event: any) => {
		this.setState({ editing: true, controlled: false }, () => {
			this.input.focus();
		});
	}

	handleBlur = (event: any, checked: boolean) => {
		event.persist();
		this.setState({ editing: this.props.editing, controlled: true }, () => {
			if (typeof this.props.onChange === "function") {
				this.props.onChange(event, checked);
			}
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
		// console.log(this.props);
        const { editable, label, name } = this.props;
		const { checked } = this.state;

    	// read only (diabled)
		if (!editable) {
			return (
                <FormControlLabel style={{width: "100%"}}
                    control={
                        <Switch
                            checked={checked}
                            disabled
                        />
                    }
                    label={label}
                />
			);
		}
		// // editable, but not in editing
		// if (!editing) {
		// 	return (<div>
        //         <FormControlLabel
        //             control={
        //                 <Switch
		// 					name={name}
		// 					checked={checked}
        //                     value={name}
        //                     onChange={this.handleChange}
        //                 />
        //             }
        //             label={label}
        //         />
		// 	</div>);
		// }
        // editing
        return (
            <FormControlLabel
                control={
                    <Switch
						name={name}
                        checked={checked}
						value={name}
                        onChange={this.handleChange}
                    />
                }
                label={label}
            />
        );
	}
}
)
export default SwitchField;
