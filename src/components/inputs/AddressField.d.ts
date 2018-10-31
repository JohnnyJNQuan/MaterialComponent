export interface IProps {
    editable?: boolean;
    editing?: boolean;
    values?: boolean;
    fields?: Array<any>;
}

export interface IState {
    editable?: boolean;
    editing?: boolean;
    values?: boolean;
}

// export const addressFields = [
//     [
//         { name: "unit", label: "Unit", type: "text" },
//         { name: "level", label: "Level", type: "text" }
//     ],
//     [
//         { name: "streetNumber", label: "Street Number", type: "text" },
//         { name: "streetName", label: "Street Name", type: "text" }
//     ]
// ];