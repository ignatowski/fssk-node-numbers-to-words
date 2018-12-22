export function validateNumber(currentNumber: string) {
	let numberError = "";
	//console.log(currentNumber);
	//const regularExpression = new RegExp('^((?=.)((?:0|(?:[1-9](?:\d*|\d{0,2}(?:,\d{3})*)))?(?:\.\d*[1-9])?))$');
	//const regularExpression = new RegExp('^(0|[1-9][0-9]{0,2}(?:(,[0-9]{3})*|[0-9]*))(\.[0-9]*[1-9]){0,1}$');
	//todo: limit to 21 integers in front
	//const regularExpression = new RegExp('^(0|[1-9][0-9]{0,2}(?:(\\.[0-9]{3})*|[0-9]*))(,[0-9]*[1-9]){0,1}$');
	const regularExpression = new RegExp('^(0|[1-9][0-9]{0,2}(?:(\\.[0-9]{3}){0,41}|[0-9]{0,123}))$');
	if (!regularExpression.test(currentNumber)) {
		//numberError = "El número debe tener un formato como: 2.057.544,02";
		numberError = "El número debe tener un formato como: 2.057.544.000";
	}
	return numberError;
}
