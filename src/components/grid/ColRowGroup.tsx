import * as React from "react";
import { Row } from "react-flexbox-grid";
import ColField from "./ColField";

export default ({columns, editable, editing, errors, values, onChange}: any) => {
	// <Col>
	// 	 <Row>
	// 		<Col />
	// 		<Col />
	// 	</Row>
	// </Col>
	return (
		<Row>
			{columns && columns.map((field: any, rowIndex: number) => {
				let isVisible = true;
				if (field.isVisible) {
					isVisible = typeof(field.visible) === "function" ? field.visible(values) : field.visible;
				}
				return isVisible 
					?	<ColField
							key={rowIndex}
							field={field}
							value={values[field.name]}
							values={values}
							error={errors && errors[field.name]}
							editable={editable}
							editing={editing}
							onChange={onChange}
						/> 
					:	<span key={rowIndex} />;
			})}
		</Row>
	);
};
