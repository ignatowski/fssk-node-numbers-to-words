import NumericTypeTranslationModel from "../module/numbers-to-words/model/numeric-type-translation-model";
import WordModel from "../module/numbers-to-words/model/word-model";
import {validateNumber} from "./number-validation";
import {getInteger} from "./number-util";
import OneModel from "../module/numbers-to-words/model/one-model";
import TenModel from "../module/numbers-to-words/model/ten-model";
import HundredModel from "../module/numbers-to-words/model/hundred-model";
import ThousandModel from "../module/numbers-to-words/model/thousand-model";
import ShortScaleNumberModel from "../module/numbers-to-words/model/short-scale-number-model";
import LongScaleNumberModel from "../module/numbers-to-words/model/long-scale-number-model";

export default class numberToWordConverter {

	numericTypeTranslationWithTables: NumericTypeTranslationModel;
	currentNumber: string;
	newWord: Array<WordModel>;

	constructor(numericTypeTranslationWithTables: NumericTypeTranslationModel, currentNumber: string) {
		this.numericTypeTranslationWithTables = numericTypeTranslationWithTables;
		this.currentNumber = currentNumber;
		this.newWord = [];
	}

	public convertNumberToWord(): Array<WordModel> {

		let $numberError = validateNumber(this.currentNumber, this.numericTypeTranslationWithTables.numericTypeId, this.numericTypeTranslationWithTables.languageId);
		if ($numberError !== '') {
			return this.newWord;
		}

		switch (this.numericTypeTranslationWithTables.numericTypeId) {
			case 1: //short scale numbers
				this.calculateShortScaleNumber();
				break;
			case 2: //long scale numbers
				this.calculateLongScaleNumber();
				break;
			default:
				break;
		}

		return this.newWord;

	}

	private calculateShortScaleNumber(): string {

		//place holder for remaining integer
		let remainingInteger = getInteger(this.currentNumber, this.numericTypeTranslationWithTables.languageId);

		//calculate how many 0's to add to the front of the number so that the number of digits is divisible by 3
		let remainder = remainingInteger.length % 3;

		if (remainder !== 0) {
			while ((3 - remainder) > 0) {
				remainingInteger = '0' + remainingInteger;
				remainder++;
			}
		}

		let threeDigits = remainingInteger.substring(0, 3);

		//remove the three digits from the remaining integer
		if (remainingInteger.length > 3) {
			remainingInteger = remainingInteger.substring(3);
		} else {
			remainingInteger = '';
		}

		this.recurseShortScaleIntegerByThreeDigits(threeDigits, remainingInteger);

		return '';

	}

	private recurseShortScaleIntegerByThreeDigits(threeDigits: string, remainingInteger: string) {

		//place holders for words to be added
		let newWord = '';

		//check if "zero" is possible
		let allowZero = false;
		if (remainingInteger === '' && this.newWord.length === 0) {
			allowZero = true;
		}

		//calculate the hundreds, tens, and ones of the second 3 digits
		newWord = this.calculateHundred(threeDigits, allowZero);

		//add exponent
		if (newWord !== '' && remainingInteger.length > 0) {
			let singular = false;
			if (threeDigits === '001') {
				singular = true;
				//special case for spanish "uno" becoming un in front of millon, billon, trillon, etc...
				if (this.numericTypeTranslationWithTables.languageId === 2) {
					newWord = newWord.substring(0, 2);
				}
			}
			newWord = newWord + ' ' + this.calculateShortScaleExponent(remainingInteger.length, singular);
		}

		//add new word to new word
		this.newWord.push(new WordModel({word: newWord, number: threeDigits}));

		//while the number of digits of remaining integers is greater than or equeal to 3 keep recursing
		if (remainingInteger.length > 3) {
			//pass in the first 3 digits from the remaining integer
				//and the remaining integer minus those 3 digits
			this.recurseShortScaleIntegerByThreeDigits(remainingInteger.substring(0, 3), remainingInteger.substring(3));
		} else if (remainingInteger.length === 3) {
			//pass in the last group of 3 digits
				//and no remaining integer
			this.recurseShortScaleIntegerByThreeDigits(remainingInteger, '');
		}

	}

	private calculateShortScaleExponent(exponent: number, singular:boolean) {

		//look for an exact match
		let result = this.numericTypeTranslationWithTables.shortScaleNumbers.filter((shortScaleNumber: ShortScaleNumberModel) => {
			return shortScaleNumber.exponent === exponent;
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

	private calculateLongScaleNumber(): string {

		//place holder for remaining integer
		let remainingInteger = getInteger(this.currentNumber, this.numericTypeTranslationWithTables.languageId);

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
		this.recurseLongScaleIntegerBySixDigits(sixDigits, remainingInteger);

		return '';

	}

	private recurseLongScaleIntegerBySixDigits(sixDigits: string, remainingInteger: string) {

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
			if (this.numericTypeTranslationWithTables.languageId === 1) {
				//special case for English thousand only having one unique name
				firstNewWord = firstNewWord + ' ' + this.calculateThousand('1000');
			} else if (this.numericTypeTranslationWithTables.languageId === 2) {
				//special case for spanish "uno" being removed in front of mil
				if (firstThreeDigits === '001') {
					firstNewWord = '';
				}
				//special case for spanish thousand only having one unique name
				firstNewWord = firstNewWord + ' ' + this.calculateThousand('1000');
			} else {
				//generic case if each thousand had a distinct name
				firstNewWord = firstNewWord + ' ' + this.calculateThousand(firstNewWord[2] + '000');
			}
		}

		//check if "zero" is possible
		let allowZero = false;
		if (remainingInteger === '' && this.newWord.length === 0 && firstNewWord === '') {
			allowZero = true;
		}

		//calculate the hundreds, tens, and ones of the second 3 digits
		secondNewWord = this.calculateHundred(secondThreeDigits, allowZero);

		//add exponent
		if ((firstNewWord !== '' || secondNewWord !== '') && remainingInteger.length > 0) {
			let singular = false;
			if (firstNewWord === '' && secondThreeDigits === '001') {
				singular = true;
				//special case for spanish "uno" becoming un in front of millon, billon, trillon, etc...
				if (this.numericTypeTranslationWithTables.languageId === 2) {
					secondNewWord = secondNewWord.substring(0, 2);
				}
			}
			secondNewWord = secondNewWord + ' ' + this.calculateLongScaleExponent(remainingInteger.length, singular);
		}

		//add new word to new word
		let newWord = '';
		if (firstNewWord !== '') {
			newWord = firstNewWord;
			if (secondNewWord !== '') {
				newWord = newWord + ' ' + secondNewWord;
			}
		} else if (secondNewWord !== '') {
			newWord = secondNewWord;
		}
		this.newWord.push(new WordModel({word: newWord, number: sixDigits}));

		//while the number of digits of remaining integers is greater than or equeal to 6 keep recursing
		if (remainingInteger.length > 6) {
			//pass in the first 6 digits from the remaining integer
				//and the remaining integer minus those 6 digits
			this.recurseLongScaleIntegerBySixDigits(remainingInteger.substring(0, 6), remainingInteger.substring(6));
		} else if (remainingInteger.length === 6) {
			//pass in the last group of 6 digits
				//and no remaining integer
			this.recurseLongScaleIntegerBySixDigits(remainingInteger, '');
		}

	}

	private calculateLongScaleExponent(exponent: number, singular:boolean) {

		//look for an exact match
		let result = this.numericTypeTranslationWithTables.longScaleNumbers.filter((longScaleNumber: LongScaleNumberModel) => {
			return longScaleNumber.exponent === exponent;
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
				if (this.numericTypeTranslationWithTables.languageId === 1) {
					//special case for english numbers hyphenating between tens and ones
					return '-' + result[0].singular;
				} else if (this.numericTypeTranslationWithTables.languageId === 2) {
					//special case for spanish numbers adding "y" between tens and ones
					return ' y ' + result[0].singular;
				} else {
					return ' ' + result[0].singular;
				}
			} else {
				return result[0].singular;
			}
		}

		//a match was not found, return an empty string
		//should never get here, throw an exception
		throw `No value found for one's digit. oneDigit: ${oneDigit}, allowZero: ${allowZero}, addSpaceToFront: ${addSpaceToFront}, languageId: ${this.numericTypeTranslationWithTables.languageId}`;

	}

}
