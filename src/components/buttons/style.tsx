import { createStyles, Theme } from "@material-ui/core";

export default (theme: Theme) => createStyles({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	paper: {
		width: "80%",
		maxHeight: 435,
	},
});
