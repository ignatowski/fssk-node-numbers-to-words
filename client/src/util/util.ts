export function isEmptyObject(obj: Object) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
}

export function objectIsEmpty(obj: object) {
	return (Object.getOwnPropertyNames(obj).length === 0);
}