import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Radio, RadioGroup} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { IProps, IState } from "./RadioGroup.d";
import styles from "./style";
import { parse } from "../utility";
import { RadioGroupProps } from '@material-ui/core/RadioGroup';

export default withStyles(styles)(
class extends React.Component<IProps & RadioGroupProps, IState> {
    constructor(props: any) {
		super(props);
		this.state = {
			editing: props.editing || false,
			// controlled: true
		};
    }

    handleChange = (event: any, value: string) => {
        const v = parse(event.target.type, value);
        if (this.props.onChange && typeof(this.props.onChange) === "function") {
            this.props.onChange(event, v);
        }
    };

    render() {
        const { classes, className, helperText, items, label, name, row } = this.props;
		const value = this.props.value ?  this.props.value.toString() : "";
		if (name === "isRented") {
			console.log(value);
		}
        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classNames(classes.formControl, className)}>
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup
                        aria-label={label}
                        name={name}
                        className={classes.group}
                        value={value}
                        onChange={this.handleChange}
                        row={row}
                    >
                        {items && items.map((item: any, i: number) => 
                            <FormControlLabel
                                key={i}
                                value={item.value ? item.value.toString() : ""}
                                disabled={item.disabled}
                                control={<Radio />}
                                label={item.label}
                            />
                        )}
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                </FormControl>
            </div>
        );
    }
})
