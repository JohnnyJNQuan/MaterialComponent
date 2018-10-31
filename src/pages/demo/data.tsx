// ------ collection data ------

const data = [
    {
        firstName: "Stephen",
        lastName: "Wong",
        departmentId: 1,
        birthDate: "01/01/2018",
        age: 30,
        salary: 100000,
        active: true,
        deleted: false,
        sex: 1,
        address: {
            unit: 2,
            level: 6
        }
    },
    {
        firstName: "Kelly",
        lastName: "Mills",
        departmentId: 2,
        birthDate: "01/01/2018",
        age: 18,
        salary: 1000000,
        active: false,
        deleted: true,
        sex: 2,
        address: {
            unit: 1,
            level: 6
        }
    }
];

// ------ Form Fields ------

const primaryFields = [
	[
        {name: "firstName", label: "First Name", type: "text", required: true, visible: false },
        {name: "lastName", label: "Last Name", type: "text", required: true },
        {name: "departmentId", label: "Department", type: "select", itemConfig: {text: "text", value: "id"},
            items: [{id: 1, text: "IT", value: "1"}, {id: 2, text: "Accounting", value: "2"}],
        },
	]
]

const secondaryFields = [
	[
		[
			{name: "active", label: "Active", type: "checkbox"},
			{name: "deleted", label: "Deleted", type: "switch"}
		],
		{name: "birthDate", label: "Birth Date", type: "date"},
		{name: "salary", label: "Salary", type: "number"},
    ],
    [
        { name: "sex", label: "Sex", type: "radio", value: 1, row: true,
            items: [{label: "Male", value: 1}, {label: "Female", value: 2}]
        }
    ]
]

const title = {
    heading: ["firstName", "lastName"], 
    subheading: (m: any)=> m.active ? "active" : "inactive" 
};


// ----- table data ------
const columns = [
    { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
    { id: 'lastName', numeric: false, disablePadding: true, label: 'Last Name' },
    { id: 'departmentId', numeric: false, disablePadding: true, label: 'Department' },
    { id: 'birthDate', numeric: false, disablePadding: true, label: 'Birth Date' },
    { id: 'salary', numeric: true, disablePadding: true, label: 'Salary' },
]

export {
	data,
	primaryFields,
	secondaryFields,
    title,
    columns,
}