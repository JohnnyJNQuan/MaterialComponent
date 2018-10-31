import * as React from "react";
import { isArray } from '../utility';
import Field from "../inputs/Field";
import { IProps } from "./GridGroup.d";

export default ({editable, editing, errors, fields, values, onChange}: IProps) => {
	return (
        <div style={{ display: "flex" }}>
            {fields && isArray(fields) && fields.map((field: any, i: number) =>
                <Field
                    key={i}
                    value={values[field.name]}
                    values={values}
                    field={field}
                    error={errors}
                    editable={editable}
                    editing={editing}
                    onChange={onChange}
                />
            )}
        </div>
    );
};