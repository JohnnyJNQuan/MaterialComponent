import * as React from 'react';
import { RowGroup } from '../grid';
import { withStyles } from '@material-ui/core/styles';
import styles from "./style";

const fields = [
    [
        { name: "unit", label: "Unit", type: "text" },
        { name: "level", label: "Level", type: "text" }
    ],
    [
        { name: "streetNumber", label: "Street Number", type: "text" },
        { name: "streetName", label: "Street Name", type: "text" }
    ],
    { name: "suburb", label: "Suburb", type: "text" },
    [ { name: "state", label: "State", type: "text" }, { name: "postcode", label: "Post Code", type: "text"}],
    { name: "country", label: "Country", type: "text" } 
];

const AddressField = withStyles(styles)(
class extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
            values: Object.assign({}, props.values),
            errors: {
                //
            }
		};
    }

    static getDerivedStateFromProps(props: any, state: any) {
		if (props.values === state.values) return null;
		return {
			values: props.values,
		};
	}

    setVisible = (arr: any) => {
        if (Array.isArray(arr)) {
            for (const o of arr) {
                this.setVisible(o);
            }
        } else {
            arr.visible = this.props.group.includes(arr.name);
        }
        return arr;
    }
    
    handleChange = (event: any) => {
        event.persist();
        const values = this.state.values;
        values[event.target.name] = event.target.value;
        this.setState({ values }, () => {
            if (this.props.onChange) {
                this.props.onChange(event, values, "address");
            }
        });
    }

    render() {
        const { values } = this.props;
        return (
            <RowGroup 
                values={values}
                // fields={this.setVisible(fields)}
                fields={fields}
                errors={[]}
                editable
                editing
                onChange={this.handleChange}
            />
        );
    }
}
)
export default AddressField;