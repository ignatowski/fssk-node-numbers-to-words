export function validateNumber(currentNumber: string, numericTypeId: number, languageId: number): string {
	switch (numericTypeId) {
		case 1: //short scale numbers
			return validateShortScaleNumber(currentNumber, languageId);
		case 2: //long scale numbers
			return validateLongScaleNumber(currentNumber, languageId);
		default:
			throw 'Unable to find numeric type id: ' + numericTypeId;
	}
}

function validateShortScaleNumber(currentNumber: string, languageId: number): string {
	let numberError = '';
	const regularExpression = new RegExp(getShortScaleRegex(languageId));
	if (!regularExpression.test(currentNumber)) {
		numberError = getShortScaleErrorMessage(languageId);
	}
	return numberError;
}

function getShortScaleRegex(languageId: number): string {
	switch (languageId) {
		case 1:
			return '^(0|[1-9]\\d{0,2}(?:(,\\d{3}){0,33}|\\d{0,102}))$';
		case 2:
			return '^(0|[1-9]\\d{0,2}(?:(\\.\\d{3}){0,33}|\\d{0,102}))$';
		default:
			return '^(0|[1-9]\\d{0,2}(?:(,\\d{3}){0,33}|\\d{0,102}))$';
	}
}

function getShortScaleErrorMessage(languageId: number): string {
	switch (languageId) {
		case 1:
			return 'The number should have a format like: 2,057,544,000 (only enter the digits, 0-9, not the commas)';
		case 2:
			return 'El número debe tener un formato como: 2.057.544.000 (solo entra las cifras, 0-9, no los puntos)';
		default:
			return 'The number should have a format like: 2,057,544,000 (only enter the digits, 0-9, not the commas)';
	}
}

function validateLongScaleNumber(currentNumber: string, languageId: number): string {
	let numberError = '';
	const regularExpression = new RegExp(getLongScaleRegex(languageId));
	if (!regularExpression.test(currentNumber)) {
		numberError = getLongScaleErrorMessage(languageId);
	}
	return numberError;
}

function getLongScaleRegex(languageId: number): string {
	//const regularExpression = new RegExp('^((?=.)((?:0|(?:[1-9](?:\d*|\d{0,2}(?:,\d{3})*)))?(?:\.\d*[1-9])?))$');
	//const regularExpression = new RegExp('^(0|[1-9][0-9]{0,2}(?:(,[0-9]{3})*|[0-9]*))(\.[0-9]*[1-9]){0,1}$');
	//const regularExpression = new RegExp('^(0|[1-9][0-9]{0,2}(?:(\\.[0-9]{3})*|[0-9]*))(,[0-9]*[1-9]){0,1}$');
	switch (languageId) {
		case 1:
			return '^(0|[1-9]\\d{0,2}(?:(,\\d{3}){0,41}|\\d{0,123}))$';
		case 2:
			//return '^(0|[1-9][0-9]{0,2}(?:(\\.[0-9]{3}){0,41}|[0-9]{0,123}))$';
			return '^(0|[1-9]\\d{0,2}(?:(\\.\\d{3}){0,41}|\\d{0,123}))$';
		default:
			return '^(0|[1-9]\\d{0,2}(?:(,\\d{3}){0,41}|\\d{0,123}))$';
	}
}

function getLongScaleErrorMessage(languageId: number): string {
	switch (languageId) {
		case 1:
			return 'The number should have a format like: 2,057,544,000 (only enter the digits, 0-9, not the commas)';
		case 2:
			return 'El número debe tener un formato como: 2.057.544.000 (solo entra las cifras, 0-9, no los puntos)';
		default:
			return 'The number should have a format like: 2,057,544,000 (only enter the digits, 0-9, not the commas)';
	}
}
