// import * as React from 'react';
// import { Link } from "react-router-dom";
// import Timesheets from "material-ui/svg-icons/image/timer";
// import Accounting from "material-ui/svg-icons/action/account-balance";
// import Contact from "material-ui/svg-icons/communication/contact-mail";
// import File from "material-ui/svg-icons/action/description";
// import Documents from "material-ui/svg-icons/editor/insert-drive-file";
// import Setup from "material-ui/svg-icons/action/build";
// import ArrowDropRight from "material-ui/svg-icons/navigation-arrow-drop-right";
// import { MenuItem } from "material-ui";

// const Nav = ({...props}) => {
//     let items = [
//         {link: "", text: "Timesheets", icon: <Timesheets />, children: [
//             {link: '', text: 'Supplier', icon: <Timesheets />, children: []}
//         ]},
//         {link: "", text: "Accounting", icon: <Accounting />, children: []},
//         {link: "", text: "Contact", icon: <Contact />, children: []},
//         {link: "", text: "File", icon: <File />, children: [] },
//         {link: "", text: "Documents", icon: <Documents />, children: [] },
//         {link: "", text: "Client", icon: <Setup />, children: []}
//     ];

//     return (
//         <span>
//             {items.map((item: any, index: number) => (
//                 <MenuItem
//                     primaryText={item.text}
//                     key={index}
//                     leftIcon={item.icon}
//                     rightIcon={item.children.length > 0 ? <ArrowDropRight /> : <span></span>}
//                     onClick={item.children.length > 0 ? null : props.handleClose}
//                     menuItems={
//                         item.children && item.children.map((child: any, indexInner: number) => 
//                             <MenuItem
//                                 key={indexInner}
//                                 containerElement={<Link to={child.link} />}
//                                 primaryText={child.text}
//                                 leftIcon={child.icon}
//                                 onClick={props.handleClose} 
//                             />
//                         ) 
//                     } 
//                 />
//             ))}
//         </span>
//     );
// }

// export default Nav;