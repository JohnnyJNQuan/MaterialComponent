import * as React from 'react';
import { Link } from 'react-router-dom'
import { List, ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountingIcon from '@material-ui/icons/AccountBalance';
// import FileIcon from '@material-ui/icons/BusinessCenter';
// import DocumentIcon from '@material-ui/icons/Description';
// import EmployeeIcon from "@material-ui/icons/Face";
import TimesheetIcon from "@material-ui/icons/Timer";
import SettlementIcon from "@material-ui/icons/AttachMoney";
// import ContactIcon from "@material-ui/icons/ContactMail";
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import TimesheetQuickAccessIcon from "material-ui/svg-icons/action/alarm-add";
// import FileNoteQuickAccessIcon from "material-ui/svg-icons/av/note";
// import AccountingIcon from "@material-ui/icons/account-balance";
// import Documents from "material-ui/svg-icons/action/description";
// import Payroll from "material-ui/svg-icons/editor/attach-money";
// import Search from "material-ui/svg-icons/action/search";
// import Setup from "material-ui/svg-icons/action/build";
// import Settings from "material-ui/svg-icons/action/settings";

const drawerItems = [
    // { text: "Accounting", link: "/accounting", icon: <AccountingIcon color="primary" />, children: [] },
    // { text: "Client", link: "/clients", icon: <DashboardIcon />, children: [] },
    // { text: "Contacts", link: "/contacts", icon: <ContactIcon />, children: [] },
    // { text: "Documents", link: "/documents", icon: <DocumentIcon />, children: [] },
    // { text: "Employees", link: "/employees", icon: <EmployeeIcon />, children: [] },
    // { text: "Files", link: "/files", icon: <FileIcon />, children: [] },
    // { text: "Timesheet", link: "/timesheet", icon: <TimesheetIcon />, children: [] },
    { text: "Demo", link: "/demo", icon: <TimesheetIcon />, children: [] },
    { text: "Questionsheet", link: "/questionsheet", icon: <AccountingIcon color="primary" />, children: [] },
    { text: "Settlement", link: "/settlement", icon: <SettlementIcon color="primary" />, children: [] }
];

const drawer = (
    <List>
        {drawerItems.map((el: any, i: number) => 
            <Link to={el.link} key={i}>
                <ListItem button>
                    <ListItemIcon>{el.icon}</ListItemIcon>
                    <ListItemText primary={el.text} />
                </ListItem>
            </Link>
        )}
    </List>
);

export {
    drawer
}
