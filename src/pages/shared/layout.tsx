import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { drawer } from "./drawer";
// import TabMenu from "./layout/tabmenu";
import styles from "./style";
// import Demo from "../demo/Demo";
// import { Questionsheet } from "../files/conveyances";
import Route from "./route";

class Dashboard extends React.Component<any, any> {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDrawerToggle = () => {
    this.setState((state: any) => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar} >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                Moxy playground
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
			<Drawer
				variant="temporary"
				open={this.state.open}
				onClose={this.handleDrawerToggle}
				classes={{
					paper: classes.drawerPaper,
				}}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
			>
				{drawer}
			</Drawer>
		  </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbarIcon}>
			  	DEMO
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>

              <Route />

          </main>
        </div>

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
