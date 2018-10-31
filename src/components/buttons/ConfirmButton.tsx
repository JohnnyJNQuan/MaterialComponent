import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { IProps } from "./ConfirmButton.d";
import styles from "./style";

export default withStyles(styles)(
class extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleOpen = () => this.setState({open: true });
    
    handleClose = () => this.setState({ open: false });

    render() {
        const { color, icon, message, text, title, variant, onYes } = this.props;
        const button = (variant === "icon"
            ? <IconButton color={color || "inherit"} onClick={this.handleOpen}>{icon}</IconButton>
            : <Button color={color || "inherit"} onClick={this.handleOpen}>{text}</Button>);
        return (
            <React.Fragment>
                {button}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>{title || "Confirmation!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{message}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onYes} color="primary">
                            {`Yes, ${text || ""}`}
                        </Button>
                        <Button onClick={this.handleClose} color="inherit" autoFocus>
                            {"No, Cancel"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
})
