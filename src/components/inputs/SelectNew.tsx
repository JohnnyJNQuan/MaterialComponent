import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { IProps } from "./SelectNew.d";
import { RowGroup } from "../grid";
import styles from "./style";

export default withStyles(styles)(
class extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            open: false,
            values: {}
        };
    }

    handleOpen = () => this.setState({open: true });
    
    handleClose = () => this.setState({ open: false });

    handleChange = (event: any) => {
        console.log(event.target);
        const values = Object.assign({}, this.state.values);
        values[event.target.name] = event.target.value;
        this.setState({ values });
    }
    
    handleSave = () => {
        console.log("new item", this.state.values);
        this.setState({ open: false }, () => {
            if (this.props.onSave) {
                this.props.onSave(this.state.values);
            }
        });
    }

    render() {
        // console.log(this.props);
        // console.log(this.state);
        // const { classes } = this.props;
        return (
            <div style={{marginTop: 24}}>
                <IconButton onClick={this.handleOpen}><AddIcon /></IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>{"Add a new item"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tip: 
                        </DialogContentText>
                        <RowGroup 
                            fields={this.props.fields} 
                            values={this.state.values || {}} 
                            editable 
                            editing 
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSave} color="primary">Save</Button>
                        <Button onClick={this.handleClose} color="inherit" autoFocus>Not Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
});
