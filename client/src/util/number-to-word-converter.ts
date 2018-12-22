import NumericTypeTranslationModel from "../module/numbers-to-words/model/numeric-type-translation-model";
import OneModel from "../module/numbers-to-words/model/one-model";
import TenModel from "../module/numbers-to-words/model/ten-model";
import HundredModel from "../module/numbers-to-words/model/hundred-model";
import ThousandModel from "../module/numbers-to-words/model/thousand-model";
import LargeScaleNumberModel from "../module/numbers-to-words/model/large-scale-number-model";

export default class numberToWordConverter {

	numericTypeTranslationWithTables: NumericTypeTranslationModel;
	currentNumber: string;
	newWord: string;

	constructor(numericTypeTranslationWithTables: NumericTypeTranslationModel, currentNumber: string) {
		this.numericTypeTranslationWithTables = numericTypeTranslationWithTables;
		this.currentNumber = currentNumber;
		this.newWord = '';
	}

	public convertNumberToWord(): string {

		switch (this.numericTypeTranslationWithTables.numericTypeId) {
			case 1: //short scale numbers
				break;
			case 2: //large scale numbers
				this.calculateLargeScaleNumber();
				break;
			default:
				break;
		}

		return this.newWord;

	}

	private calculateLargeScaleNumber() {

		//todo: validate the number? it's already validated before this class is called?
		//todo: make sure the number has at least one digit


		//get the decimal character
		let decimalCharacter = '';
		switch (this.numericTypeTranslationWithTables.languageId) {
			case 1:
				decimalCharacter = '.';
				break;
			case 2:
				decimalCharacter = ',';
				break;
			default:
				decimalCharacter = '.';
		}

		//get the index of the decimal character
		let decimalPosition = this.currentNumber.indexOf(decimalCharacter);

		//place holder for remaining integer
		let remainingInteger = '';

		if (decimalPosition === -1) {

			//number does not have a decimal character
			//entire number is integer
			remainingInteger = this.sanitizeInteger(this.currentNumber);

		} else {

			//verify that the number only has one decimal character
			let secondDecimalPosition = this.currentNumber.indexOf(decimalCharacter, (decimalPosition + 1));
			if (secondDecimalPosition !== -1) {
				//number has more than one decimal place
				//todo: handle error
				return '';
			}

			//number has a decimal character
			//split the number into integer and decimal
			remainingInteger = this.sanitizeInteger(this.currentNumber.substring(0, decimalPosition));

		}

		//calculate how many 0's to add to the front of the number so that the number of digits is divisible by 6
		let remainder = remainingInteger.length % 6;

		if (remainder !== 0) {
			while ((6 - remainder) > 0) {
				remainingInteger = '0' + remainingInteger;
				remainder++;
			}
		}

		let sixDigits = remainingInteger.substring(0, 6);
		//remove the six digits from the remaining integer
		if (remainingInteger.length > 6) {
			remainingInteger = remainingInteger.substring(6);
		} else {
			remainingInteger = '';
		}
		this.recurseLargeScaleIntegerBySixDigits(sixDigits, remainingInteger);

		return '';

	}

	//TODO: move this to number validation
	private sanitizeInteger(integer: string): string {
		//remove any characters that are not digits, 0-9, from the integer
		integer = integer.replace(/\D/g, '');
		//todo:
		//remove left most 0's,
			//but not the final 0 if the number is 0
		return integer;
	}

	//TODO: move this to number validation
	/*
	private sanitizeDecimal(decimal: string): string {
		//remove any characters that are not digits, 0-9, from the decimal
		decimal = decimal.replace(/\D/g, '');
		//todo:
		//remove right most 0's,
			//but not the final 0 if the number is .0???
		return decimal;
	}
	*/

	private recurseLargeScaleIntegerBySixDigits(sixDigits: string, remainingInteger: string) {

		//place holders for words to be added
		let firstNewWord = '';
		let secondNewWord = '';

		//split 6 digits into 2 groups of 3 digits
		let firstThreeDigits = sixDigits.substring(0, 3);
		let secondThreeDigits = sixDigits.substring(3);

		//calculate the hundreds, tens, and ones of the first 3 digits
		firstNewWord = this.calculateHundred(firstThreeDigits, false);

		//add thousands
		if (firstNewWord !== '') {
			//special case for spanish "uno" being removed in front of mil
			if (firstThreeDigits === '001') {
				firstNewWord = '';
			}
			firstNewWord = firstNewWord + ' ' + this.calculateThousand('1000');
		}
		
		//add new word to new word
		if (firstNewWord !== '') {
			if (this.newWord === '') {
				this.newWord = firstNewWord
			} else {
				this.newWord = this.newWord + ' ' + firstNewWord;
			}
		}

		//check if "zero" is possible
		let allowZero = false;
		if (remainingInteger === '' && this.newWord === '' && firstNewWord === '') {
			allowZero = true;
		}

		//calculate the hundreds, tens, and ones of the second 3 digits
		secondNewWord = this.calculateHundred(secondThreeDigits, allowZero);

		//add exponent
		if ((firstNewWord !== '' || secondNewWord !== '') && remainingInteger.length > 0) {
			let singular = false;
			//special case for spanish "uno" becoming un in front of millon, billon, trillon, etc...
			if (firstNewWord === '' && secondThreeDigits === '001') {
				secondNewWord = secondNewWord.substring(0, 2);
				singular = true;
			}
			secondNewWord = secondNewWord + ' ' + this.calculateExponent(remainingInteger.length, singular);
		}

		//add new word to new word
		if (secondNewWord !== '') {
			if (this.newWord === '') {
				this.newWord = secondNewWord
			} else {
				this.newWord = this.newWord + ' ' + secondNewWord;
			}
		}

		//while the number of digits of remaining integers is greater than or equeal to 6 keep recursing
		if (remainingInteger.length > 6) {
			//pass in the first 6 digits from the remaining integer
				//and the remaining integer minus those 6 digits
			this.recurseLargeScaleIntegerBySixDigits(remainingInteger.substring(0, 6), remainingInteger.substring(6));
		} else if (remainingInteger.length === 6) {
			//pass in the last group of 6 digits
				//and no remaining integer
			this.recurseLargeScaleIntegerBySixDigits(remainingInteger, '');
		}

	}

	private calculateExponent(exponent: number, singular:boolean) {

		//look for an exact match
		let result = this.numericTypeTranslationWithTables.largeScaleNumbers.filter((largeScaleNumber: LargeScaleNumberModel) => {
			return largeScaleNumber.exponent === exponent;
		});

		if (result.length === 1) {
			//an exact match was found, so return that
			if (singular) {
				return result[0].singular;
			} else {
				return result[0].plural;
			}
		}

		return '';

	}

	private calculateThousand(fourDigits: string): string {

		//look for an exact match
		let result = this.numericTypeTranslationWithTables.thousands.filter((thousand: ThousandModel) => {
			return thousand.digits === parseInt(fourDigits);
		});

		if (result.length === 1) {
			//an exact match was found, so return that
			return result[0].singular;
		}

		return '';

	}

	private calculateHundred(threeDigits: string, allowZero: boolean): string {

		//look for an exact match
		let result = this.numericTypeTranslationWithTables.hundreds.filter((hundred: HundredModel) => {
			return hundred.digits === parseInt(threeDigits);
		});

		if (result.length === 1) {
			//an exact match was found, so return that
			return result[0].singular;
		} else {

			//look for a generic match based only on the hundreds digit
			result = this.numericTypeTranslationWithTables.hundreds.filter((hundred: HundredModel) => {
				return hundred.digits === parseInt(threeDigits[0]+'00');
			});

			if (result.length === 1) {
				//a generic result for the hundreds digit was found
					//so return that
					//plus the tens digit
				return result[0].plural + ' ' + this.calculateTen(threeDigits.substring(1), false);
			} else {
				//no generic result was found
					//hundreds digit is 0
					//or some other value that doesn't exist in this language
					//so return the calculation of the tens digit
					return this.calculateTen(threeDigits.substring(1), allowZero);
			}

		}

	}

	private calculateTen(twoDigits: string, allowZero: boolean): string {
		
		//look for an exact match
		let result = this.numericTypeTranslationWithTables.tens.filter((ten: TenModel) => {
			return ten.digits === parseInt(twoDigits);
		});

		if (result.length === 1) {
			//an exact match was found, so return that
			return result[0].singular;
		} else {

			//look for a generic match based only on the tens digit
			result = this.numericTypeTranslationWithTables.tens.filter((ten: TenModel) => {
				return ten.digits === parseInt(twoDigits[0]+'0');
			});

			if (result.length === 1) {
				//a generic result for the tens digit was found
					//so return that
					//plus the ones digit
				return result[0].plural + this.calculateOne(twoDigits[1], false, true);
			} else {
				//no generic result was found
					//tens digit is 0
					//or some other value that doesn't exist in this language
					//so return the calculation of the ones digit
				return this.calculateOne(twoDigits[1], allowZero, false);
			}

		}

	}

	private calculateOne(oneDigit: string, allowZero: boolean, addSpaceToFront: boolean): string {
		
		//look for an exact match
		let result = this.numericTypeTranslationWithTables.ones.filter((one: OneModel) => {
			return one.digits === parseInt(oneDigit);
		});

		//an exact match was found
		if (result.length === 1) {
			//if 0 is not currently allowed and the result is 0, return an empty string
			if (!allowZero && oneDigit == '0') {
				return '';
			}
			if (addSpaceToFront) {
				return ' y ' + result[0].singular;
			} else {
				return result[0].singular;
			}
		}

		//a match was not found, return an empty string
		//should never get here
		//todo: throw an exception
		return '';

	}

}
