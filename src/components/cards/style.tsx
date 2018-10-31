import red from '@material-ui/core/colors/red';
import { Theme, createStyles } from '@material-ui/core';

export default (theme: Theme) => createStyles({
	card: {
		width: 430,
		marginBottom: 2,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
		}),
		marginLeft: 'auto',
		[theme.breakpoints.up('sm')]: {
		marginRight: -8,
		},
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
});
  