import { Theme, createStyles } from '@material-ui/core/styles';

export default (theme: Theme) => createStyles({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
});