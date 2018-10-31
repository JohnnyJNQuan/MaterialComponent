// import * as React from 'react';
// // import {Link} from 'react-router-dom';
// import AppBar from '@material-ui/core/AppBar';
// import IconButton from '@material-ui/core/IconButton';
// import IconMenu from '@material-ui/core/IconMenu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/core/svg-icons/navigation/more-vert';
// import Menu from '@material-ui/core/svg-icons/navigation/menu';
// import ViewModule from '@material-ui/core/svg-icons/action/view-module';
// import {white} from '@material-ui/core/styles/colors';
// import SearchBox from './SearchBox';

// class Header extends React.Component {

//   handleTitleTouchTap = () => {
//     // todo
//   }

//   handleChangeRequestNavDrawer = () => {
//     // todo
//   }

//   render() {

//     const styles = {
//       appBar: {
//         position: 'fixed' as any,
//         justifyContent: 'space-between',
//         top: 0,
//         overflow: 'hidden',
//         maxHeight: 48
//       },
//       menuButton: {
//         marginLeft: 10
//       },
//       iconsRightContainer: {
//         marginLeft: 20
//       }
//     };

//     return (
//         <div>
//             <AppBar
//               title={
//                 <div style={{display: 'flex', width: '100%' }}>
//                   MOXY
//                   <SearchBox />
//                 </div>
//               }
//               onTitleClick={this.handleTitleTouchTap}
//               iconElementLeft={
//                 <IconButton style={styles.menuButton} onClick={this.handleChangeRequestNavDrawer}>
//                   <Menu color={white} />
//                 </IconButton>
//               }
//               iconElementRight={
//                 <div style={styles.iconsRightContainer}>
//                   <IconMenu 
//                     iconButtonElement={
//                       <IconButton><ViewModule color={white}/></IconButton>
//                     }
//                     targetOrigin={{horizontal: 'right', vertical: 'top'}}
//                     anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//                   >
//                     <MenuItem key={1} primaryText="Contact"/>
//                     <MenuItem key={2} primaryText="File"/>
//                     <MenuItem key={3} primaryText="Document"/>
//                     <MenuItem key={4} primaryText="Accounting"/>
//                     <MenuItem key={5} primaryText="Settings"/>
//                   </IconMenu>
//                   <IconMenu 
//                     iconButtonElement={
//                       <IconButton><MoreVertIcon color={white}/></IconButton>
//                     }
//                     targetOrigin={{horizontal: 'right', vertical: 'top'}}
//                     anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//                   >
//                     <MenuItem primaryText="Sign out" />
//                   </IconMenu>
//                 </div>
//               }
//             />
//           </div>
//       );
//   }
// }

// export default Header;
