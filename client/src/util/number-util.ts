export function formatNumber(currentNumber: string, numericTypeId: number, languageId: number): string {
	switch (numericTypeId) {
		case 1: //short scale numbers
			return formatShortScaleNumber(currentNumber, languageId);
		case 2: //long scale numbers
			return formatLongScaleNumber(currentNumber, languageId);
		default:
			throw 'Unable to find numeric type id: ' + numericTypeId;
	}
}

function formatShortScaleNumber(currentNumber: string, languageId: number): string {
	let integer = getInteger(currentNumber, languageId);
	integer = addThreeDigitSeparators(integer, languageId);
	return integer;
}

function formatLongScaleNumber(currentNumber: string, languageId: number): string {
	let integer = getInteger(currentNumber, languageId);
	integer = addThreeDigitSeparators(integer, languageId);
	return integer;
}

function getDecimalCharacter(languageId: number): string {
	switch (languageId) {
		case 1:
			return '.';
		case 2:
			return ',';
		default:
			return '.';
	}
}

function getDecimalPosition(currentNumber: string, decimalCharacter: string): number {
	return currentNumber.indexOf(decimalCharacter);
}

export function getInteger(currentNumber: string, languageId: number): string {

	//get the decimal character
	let decimalCharacter = getDecimalCharacter(languageId);

	//get the index of the decimal character
	let decimalPosition = getDecimalPosition(currentNumber, decimalCharacter);

	//place holder for remaining integer
	let integer = '';

	if (decimalPosition === -1) {
		//number does not have a decimal character
		//entire number is integer
		integer = currentNumber;
	} else {
		//number has a decimal character
		//split the number into integer and decimal
		//todo: not allowing decimals at the moment
		//integer = currentNumber.substring(0, decimalPosition);
		integer = currentNumber;

	}

	//sanitize the integer
	integer = sanitizeInteger(integer);

	return integer;

}

function sanitizeInteger(integer: string): string {
	//remove any characters that are not digits, 0-9, from the integer
	integer = integer.replace(/\D/g, '');
	//remove left most 0's,
		//but not the final 0 if the number is 0
	if (integer.length > 1) {
		while (integer.length > 1 && integer.charAt(0) === '0') {
			integer = integer.substring(1);
		}
	}
	return integer;
}

/*
function sanitizeDecimal(decimal: string): string {
	//remove any characters that are not digits, 0-9, from the decimal
	decimal = decimal.replace(/\D/g, '');
	//todo:
	//remove right most 0's,
		//but not the final 0 if the number is .0???
	return decimal;
}
*/

function getThreeDigitSeparator(languageId: number): string {
	switch (languageId) {
		case 1:
			return ',';
		case 2:
			return '.';
		default:
			return ',';
	}
}

function addThreeDigitSeparators(integer: string, languageId: number): string {
	let threeDigitSeparator = getThreeDigitSeparator(languageId);
	integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, threeDigitSeparator);
	return integer;
}
