import { createStyles, Theme } from "@material-ui/core";

export default (theme: Theme) => createStyles({
	root: {
		display: "flex",
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	fix: {
		// width: 400
		flexBasis: 300,
		[theme.breakpoints.down("sm")]: {
			flexBasis: 0,
		},
	},
	grow: {
		flexGrow: 1
	},
	preview: {
		padding: 0,
		margin: 0,
	},
	sumLine: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: theme.spacing.unit * 2,
		alignItems: "baseline"
	}
});
