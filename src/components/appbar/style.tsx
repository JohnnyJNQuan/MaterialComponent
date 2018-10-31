import { createStyles, Theme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

export default (theme: Theme) => createStyles({
  root: {
    width: "100%",
    // backgroundColor: "transparent",
    // boxShadow: "none",
  },
  denseToolbar: {
    paddingRight: 8
  }, 
  grow: {
    flexGrow: 1,
  },
  avatar: {
	  width: 24,
	  height: 24,
    marginRight: theme.spacing.unit * 2,
    color: "white",
	  backgroundColor: theme.palette.secondary.main,
	  fontSize: 16
  },
  title: {
    flexGrow: 1,
    display: "none",
    // color: theme.palette.primary.main,
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
  },
  titleBadge: {
    // margin: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 2,
    // padding: `0 ${theme.spacing.unit * 2}px`,
  },
  headline: {
    flexGrow: 1,
    display: "none",
    color: theme.palette.secondary.main,
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
  },
  subheading: {
    flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("lg")]: {
        display: "block",
      },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  tableToolbar: {
    marginTop: 0,
    paddingRight: 0
  },
  backgroundTransparent: {
    backgroundColor: "transparent"
  },
  sectionExpand: {
	  padding: theme.spacing.unit
  },
  noBoxShadow: {
	  boxShadow: "none"
  }
});
