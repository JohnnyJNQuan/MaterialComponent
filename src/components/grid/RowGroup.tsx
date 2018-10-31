import * as React from "react";
import { Row } from "react-flexbox-grid";
import { isArray, getValue } from '../utility';
import ColField from "./ColField";
import { IProps } from "./GridGroup.d";

export default ({editable, editing, errors, fields, values, onChange}: IProps) => {
    // console.log(editing);
	return (
        <div>
            {fields && isArray(fields) && fields.map((grp: any, grpKey: number) =>
                <Row key={grpKey}>
                    {!isArray(grp) && getValue(grp, values) &&
                        <ColField
                            key={grpKey}
                            field={grp}
							value={values[grp.name]}
							values={values}
                            error={errors && errors[grp.name]}
                            editable={editable}
                            editing={editing}
                            onChange={onChange}
                        />
                    }
                    {isArray(grp) && grp.map((field: any, columnIndex: number) =>
                        <ColField
                            key={columnIndex}
                            field={field}
							value={values[field.name]}
							values={values}
                            error={errors && errors[field.name]}
                            editable={editable}
                            editing={editing}
                            onChange={onChange}
                        />
                    )}
                </Row>
            )}
        </div>
    );
};