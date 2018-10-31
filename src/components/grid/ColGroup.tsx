import * as React from "react";
import { Row, Col } from "react-flexbox-grid";
// import { isArray } from '../utility';
import ColRowGroup from "./ColRowGroup";
import { Field } from "../inputs";
import { IProps } from "./GridGroup.d";

export default ({editable, editing, errors, fields, values, onChange}: IProps) => {
	return (
		<Row style={{marginTop: 16}}>
			{fields && Array.isArray(fields) && fields.map((grp: any, grpKey: number) =>
				<Col xs key={grpKey}>
					{Array.isArray(grp) && grp.map((field: any, fldKey: number) => {
						if (Array.isArray(field)) {
							return <ColRowGroup
										key={fldKey}
										values={values}
										columns={field}
										errors={errors}
										editable={editable}
										editing={editing}
										onChange={onChange}
									/>;
						} else {
							let isVisible = true;
							if (field.isVisible) {
								isVisible = typeof(field.visible) === "function" ? field.visible(values) : field.visible;
							}
							return 	isVisible 
								? 	<Field
										key={fldKey}
										value={values[field.name]}
										values={values}
										field={field}
										error={errors && errors[field.name]}
										editable={editable}
										editing={editing}
										onChange={onChange}
									/> 
								: <span key={fldKey} />
						}
					})}
				</Col>
			)}
		</Row>
	);
};
