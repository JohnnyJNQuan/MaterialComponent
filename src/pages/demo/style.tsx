import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) => createStyles({
	root: {
		flexGrow: 1,
	},
	flex: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
    },
	appBarSpacer: theme.mixins.toolbar,
	badge: {
		margin: theme.spacing.unit * 2,
		padding: `0 ${theme.spacing.unit * 2}px`,
	},
});