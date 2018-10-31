import { WithStyles, PropTypes } from "@material-ui/core";
import styles from "./style";

export interface IProps extends WithStyles<typeof styles> {
	color?: PropTypes.Color;
	label: string;
	size?: "small" | "medium" | "large";
	variant?: "flat" | "floating" | "icon" | "outlined" | "raised" | "text";
}
