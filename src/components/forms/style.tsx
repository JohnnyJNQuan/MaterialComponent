import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
	root: {
		width: "100%"
	},
	title: {
		fontSize: theme.typography.pxToRem(20),
		flexBasis: "33.33%",
		flexShrink: 0,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0,
	},
	primaryHeading: {
	// color: theme.palette.text.primary,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		// color: theme.palette.text.secondary,
	},
	panelSummary: {
		// margin: "8px 0"
	},
	panelHeader: {
		display: "block"
	},
	panelDetails: {
		display: "block"
	},
	panelAvatar: {
	  // margin: 10
	  width: 24,
	  height: 24,
	  marginRight: theme.spacing.unit * 2,
	  backgroundColor: theme.palette.secondary.light,
	  fontSize: 16
	},
});
  