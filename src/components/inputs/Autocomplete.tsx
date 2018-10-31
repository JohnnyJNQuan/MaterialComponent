import * as React from "react";
import classNames from "classnames";
import Select from "react-select";
import { withStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
// import { IProps, IState } from "./Autocomplete.d";

const suggestions = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        height: 250
    },
    input: {
        display: "flex",
        padding: 0
    },
    valueContainer: {
        display: "flex",
        flexWrap: "wrap" as any,
        flex: 1,
        alignItems: "center",
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
        backgroundColor: emphasize(
        theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
        )
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: "absolute" as any,
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: "absolute" as any,
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2
    },
});

// const NoOptionsMessage = (props: any) => {
//     return (
//         <Typography
//             color="textSecondary"
//             className={props.selectProps.classes.noOptionsMessage}
//             {...props.innerProps}
//         >
//             {props.children}
//         </Typography>
//     );
// }

// const inputComponent = ({ inputRef, ...props }: any) => {
//     return <div ref={inputRef} {...props} />;
// }

// const Control = (props: any) => {
//     return (
//         <TextField
//             fullWidth
//             InputProps={{
//                 inputComponent,
//                 inputProps: {
//                     // className: props.selectProps.classes.input,
//                     inputRef: props.innerRef,
//                     children: props.children,
//                     ...props.innerProps,
//                 },
//             }}
//             {...props.selectProps.textFieldProps}
//         />
//     );
// }

// const Option = (props: any) => {
//     return (
//         <MenuItem
//         buttonRef={props.innerRef}
//         selected={props.isFocused}
//         component="div"
//         style={{
//             fontWeight: props.isSelected ? 500 : 400,
//         }}
//         {...props.innerProps}
//         >
//         {props.children}
//         </MenuItem>
//     );
// }

// const Placeholder = (props: any) => {
//     return (
//         <Typography
//             color="textSecondary"
//             className={props.selectProps.classes.placeholder}
//             {...props.innerProps}
//         >
//             {props.children}
//         </Typography>
//     );
// }

// const SingleValue = (props: any) => {
//     return (
//         <Typography 
//             className={props.selectProps.classes.singleValue} 
//             {...props.innerProps}
//         >
//             {props.children}
//         </Typography>
//     );
// }

// const ValueContainer = (props: any) => {
//   return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
// }

// const MultiValue = (props: any) => {
//     return (
//         <Chip
//             tabIndex={-1}
//             label={props.children}
//             className={classNames(props.selectProps.classes.chip, {
//                 [props.selectProps.classes.chipFocused]: props.isFocused,
//             })}
//             onDelete={props.removeProps.onClick}
//             deleteIcon={<CancelIcon {...props.removeProps} />}
//         />
//     );
// }

// const Menu = (props: any) => {
//     return (
//         <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
//             {props.children}
//         </Paper>
//     );
// }

// const components = {
//     Control,
//     Menu,
//     MultiValue,
//     NoOptionsMessage,
//     Option,
//     Placeholder,
//     SingleValue,
//     ValueContainer,
// };

const Autocomplete = withStyles(styles)(
class IntegrationReactSelect extends React.Component<any, any> {
    constructor(props: any) {
		super(props);
		this.state = {
            single: null,
            multi: null
		};
    }

    NoOptionsMessage = (props: any) => {
        return (
            <Typography
                color="textSecondary"
                className={props.classes.noOptionsMessage}
                {...props.innerProps}
            >
                {props.children}
            </Typography>
        );
    }
    
    inputComponent = ({ inputRef, ...props }: any) => {
        return <div ref={inputRef} {...props} />;
    }
    
    Control = () => {
        return (
            <TextField
                fullWidth
                InputProps={{
                    inputComponent: this.inputComponent,
                    inputProps: {
                        className: this.props.classes.input,
                        inputRef: this.props.innerRef,
                        children: this.props.children,
                        ...this.props.innerProps,
                    },
                }}
                {...this.props}
            />
        );
    }
    
    Option = () => {
        return (
            <MenuItem
				buttonRef={this.props.innerRef}
				selected={this.props.isFocused}
				component="div"
				style={{
					fontWeight: this.props.isSelected ? 500 : 400,
				}}
				{...this.props.innerProps}
            >
            	{this.props.children}
            </MenuItem>
        );
    }
    
    Placeholder = () => {
        return (
            <Typography
                color="textSecondary"
                className={this.props.classes.placeholder}
                {...this.props.innerProps}
            >
                {this.props.children}
            </Typography>
        );
    }
    
    SingleValue = () => {
        return (
            <Typography 
                className={this.props.classes.singleValue} 
                {...this.props.innerProps}
            >
                {this.props.children}
            </Typography>
        );
    }
    
    ValueContainer = () => {
      return <div className={this.props.classes.valueContainer}>{this.props.children}</div>;
    }
    
    MultiValue = () => {
        return (
            <Chip
                tabIndex={-1}
                label={this.props.children}
                className={classNames(this.props.classes.chip, {
                    [this.props.classes.chipFocused]: this.props.isFocused,
                })}
                onDelete={this.props.removeProps.onClick}
                deleteIcon={<CancelIcon {...this.props.removeProps} />}
            />
        );
    }
    
    Menu = () => {
        return (
            <Paper square className={this.props.classes.paper} {...this.props.innerProps}>
                {this.props.children}
            </Paper>
        );
    }

    handleChange = (name: any) => (value: any) => {
        this.setState({
            [name]: value,
        });
    };

    render() {
        const { classes } = this.props;


        const selectStyles = {
            input: (base: any) => ({
                ...base,
                // color: theme && theme.palette.text.primary,
                // "& input": {
                // font: "inherit",
                // },
            }),
        };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            // classes={classes}
            styles={selectStyles}
            options={suggestions}
            components={{
                Control: this.Control,
                Menu: this.Menu,
                MultiValue: this.MultiValue,
                NoOptionsMessage: this.NoOptionsMessage,
                Option: this.Option,
                Placeholder: this.Placeholder,
                SingleValue: this.SingleValue,
                ValueContainer: this.ValueContainer,
            }}
            value={this.state.single}
            onChange={this.handleChange("single")}
            placeholder="Search a country (start with a)"
          />
      </NoSsr>
      </div>
    );
  }
});

export default Autocomplete;

//  export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
