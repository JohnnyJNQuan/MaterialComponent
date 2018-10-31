import * as React from "react";
import { Col } from "react-flexbox-grid";
import { Field } from "../inputs";

export default ({editable, editing, error, field, value, values, onChange}: any) => {
	return (
		<Col xs={field.xs} sm={field.sm} md={field.md} lg={field.lg} xl={field.xl} key={field}>
			<Field
				value={value}
				values={values}
				field={field}
				error={error}
				editable={editable}
				editing={editing}
				onChange={onChange}
			/>
		</Col>
	);
};
