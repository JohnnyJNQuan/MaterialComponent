import * as moment from "moment";

/* utitily */

const convert = (value: any, type: any) => {
	if (!value) return value;

	switch (type) {
		case "radio":
			if (value === "true" || value === "false") {
				return value === "true";
			} 
			if (!isNaN(value)) {
				return Number(value);
			}
			return value;
        case "checkbox": 
            return value === "true" || value === true;
        case "text": 
            return value;
        case "number": 
            return Number(value);
        case "date": 
            return moment(value).toISOString();
        default: 
            return value;
	}
}

const clone = (obj: any) => {
	let copy: any;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" !== typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

const dateDiffInDays = (a: Date, b: Date) => {
    // a and b are javascript Date objects
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const groupBy = (arr: Array<any>, by: any): Array<any> => {
    if (!arr || arr.length === 0) {
        return arr;
    }
    return arr.reduce((groups, item) => {
        const val = item[by];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
};

const isArray = (o: any) => Object.prototype.toString.call(o) === "[object Array]";  // Array.isArray(x)

const isDecimal = (value: any, decimal: number = 2) => {
    // http://stackoverflow.com/questions/16242449/regex-currency-validation
    //// Requires a decimal and commas
    // ^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?\.[0-9]{1,2}$

    //// Allows a decimal, requires commas
    // (?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$

    //// Decimal and commas optional
    // (?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$

    //// Decimals required, commas optional
    // ^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?\.[0-9]{1,2}$

    //// Sign plus, minus, decimal and commas optional
    // let regex = /(?=.)^[-+]?(([1-9][0-9]{0,10}(,[0-9]{3})*)|0)?(\.[0-9]{0,2})?$/;
    const regex = new RegExp("(?=.)^[-+]?(([1-9][0-9]{0,10}(,[0-9]{3})*)|0)?(\.[0-9]{0," + decimal + "})?$");
    return regex.test(value);
}

const isFunction = (o: any) => typeof(o) === "function";

const getValue = (o: any, v: any) => {
	if (!o) return o;
	return isFunction(o) ? o(v) : o;
};

// find value by name from data
const getPropNameValues = (data: any, names: any) => {
	if (!data || !names) return "";
    const values = {};
	if (!isArray(names)) {
		values[names] = data[names];
	}
	names.forEach((name: any) => {
		values[name] = data[name];
	});
	return values;
};

const getObjectValue = (obj: any, values: any) => {
    // debugger
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    if (typeof obj === "function") return obj(values);
    if (Array.isArray(obj)) {
        let s = "";
        obj.forEach((el: any) => {
            s += (isFunction(el) ? el(values) : values[el]) + " ";
        });
        return s;
    }
    return obj;
}

const getActionStatus = (i: number, added: Array<any>, deleted: Array<any>, updated: Array<any>) => {
	if (deleted && deleted.indexOf(i) !== -1) return "delete";
	if (added && added.indexOf(i) !== -1) return "add";
	if (updated && updated.indexOf(i) !== -1) return "update";
	return "";
};

const includesIn = (obj: any, v: any, caseinsensitive = true): boolean => {
	for (const prop in obj) {
		if (obj.hasOwnProperty(prop) && typeof(obj[prop]) === "string") {
			const value = obj[prop];
			if (caseinsensitive) {
				if (value && value.toLowerCase().includes(v.toLowerCase())) return true;
			} else {
				if (obj[prop].includes(v)) return true;
			}
		}
	}
	return false;
};

const round = (num: number, fractionDigits: number) => {
	if (!num) return num;
	return Number(num.toFixed(fractionDigits));
	// let base = 10;
	// for (let i = 1; i <= decimal; i++) {
	// 	base = base * 10;
	// }
    // return Math.round(num * base) / base;
}

const toMoney = (n: number) => {
    if (n === null || !isDecimal(n)) return "";
	return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

const setActionStatus = (
    arr: any,
    added: Array<number>,
    updated: Array<number>,
    removed: Array<number>
) => {
    const a = Object.assign([], arr);
    a.forEach((e: any, i: any) => {
        if (added.indexOf(i) !== -1) {
            a[i].actionStatus = 1;
        } else if (updated.indexOf(i) !== -1) {
            a[i].actionStatus = 2;
        } else if (removed.indexOf(i) !== -1) {
            a[i].actionStatus = 3;
        } else {
            //
        }
    });
    return a;
};

const parse = (type: any, str: string) => {
    if (!str) return null;
    switch (type) {
        case "number":
            return Number(str);
        case "string":
            return str;
        case "boolean":
            return str === "true";
        default:
            return str;
    }
};

const sortby = (field: any, reverse: any, primer: any) => {
    const key = (x: any) => {
        return primer ? primer(x[field]) : x[field];
    };

    return (a: any, b: any) => {
  const A = key(a);
  const B = key(b);
        return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse];
    };
};

const stableSort = (array: any, cmp: any) => {
    const stabilizedThis = array.map((el: any, index: number) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
};

const desc = (a: any, b: any, orderBy: any) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
};

const getSorting = (order: any, orderBy: any) => {
    return order === "desc"
        ? (a: any, b: any) => desc(a, b, orderBy)
        : (a: any, b: any) => -desc(a, b, orderBy);
};

// the original obj is changed
const setSelectList = (obj: any, searchProp: any, value: any, setProp = "items") => {
	const name = "name";
	if (Array.isArray(obj)) {
		for (const o of obj) {
			setSelectList(o, searchProp, value, setProp);
		}
	} else {

		if (obj.hasOwnProperty(name) && obj.hasOwnProperty(setProp) && obj[name] === searchProp) {
			obj[setProp] = value;
		}
	}
	return obj;
};

// the original obj is changed
const setValue = (obj: any, name: string, value: any) => {
	if (Array.isArray(obj)) {
		for (const o of obj) {
			setValue(o, name, value);
		}
	} else {
		if (obj.hasOwnProperty(name)) {
			obj[name] = value;
		}
	}
	return obj;
};

const replaceIn = (toObj: any, fromObj: any, names: any) => {
	if (!toObj && !fromObj && !names) return toObj;

	// const copy = clone(fromObj);
	if (!Array.isArray(names)) {
		toObj[names] = fromObj[names];
		return toObj;
	} 

	names.forEach((name: any) => {
		toObj[name] = fromObj[name];
	})
	return toObj;
};

const getPropsValues = (obj: any, props: any) => {
	const values = {};
	if (Array.isArray(props)) {
		for (const p of props) {
			getPropsValues(obj, p);
		}
	} else {
        for (const attr in props) {
            if (obj.hasOwnProperty(attr)) values[attr] = clone(obj[attr]);
        }
        return values;
	}
	return values;
};

// get a list of prop name from object (array, object or mixture)
const getPropNameList = (obj: any, name = "name") => {
	let list: any;
	let names: any;
	if (Array.isArray(obj)) {
		list = list || [];
		for (const a of obj) {
			names = getPropNameList(a);
			if (Array.isArray(names)) {
				names.forEach((el: string) => {
					list.push(el);
				});
			}
			else {
				list.push(names);
			}
		}
		return list;
	} else {
		if (obj.hasOwnProperty(name)) {
			return obj[name];
		}
	}
}

export {
	convert,
    clone,
	dateDiffInDays,
	desc,
	getActionStatus,
    groupBy,
	includesIn,
	isArray,
	isDecimal,
	isFunction,
	getPropsValues,
	getPropNameList,
    getSorting,
    getValue,
    getPropNameValues,
    getObjectValue,
	parse,
	round,
	toMoney,
	setActionStatus,
	setSelectList,
    sortby,
	stableSort,
	replaceIn
};
