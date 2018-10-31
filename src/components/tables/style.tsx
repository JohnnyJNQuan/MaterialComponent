import { Theme, createStyles } from "@material-ui/core";
import { lighten } from '@material-ui/core/styles/colorManipulator';

export default (theme: Theme) => createStyles({
    root: {
      // paddingRight: theme.spacing.unit,
      width: '100%',
      // marginTop: theme.spacing.unit * 3,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
    table: {
    //   tableLayout: "fixed",
      width: "100%"
    },
    tableWrapper: {
        overflowX: 'auto',
	},
	tableHead: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
});