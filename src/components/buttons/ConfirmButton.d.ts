import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
    color: PropTypes.Color;
    icon?: any;
    message: any;
    text?: string;
    title?: any;
    variant: string;
    onYes(): void;
}
