import NumericTypeTranslationModel from "../module/numbers-to-words/model/numeric-type-translation-model";
import TenModel from "../module/numbers-to-words/model/ten-model";
import OneModel from "../module/numbers-to-words/model/one-model";

export default class numberToWordConverter {

	numericTypeTranslationWithTables: NumericTypeTranslationModel;

	constructor(numericTypeTranslationWithTables: NumericTypeTranslationModel) {
		this.numericTypeTranslationWithTables = numericTypeTranslationWithTables;
		//console.log(this.numericTypeTranslationWithTables);
	}

	//private calculateHundred(digit: string, toTheRight: string): string {
		//console.log(this.numericTypeTranslationWithTables.hundreds);
		//return 'h';
	//}

	private calculateTen(digits: string): string {
		console.log(this.numericTypeTranslationWithTables.tens);
		let result = this.numericTypeTranslationWithTables.tens.filter((ten: TenModel) => {
			return ten.digits === parseInt(digits);
		});
		if (result.length === 1) {
			return result[0].singular;
		} else {
			result = this.numericTypeTranslationWithTables.tens.filter((ten: TenModel) => {
				return ten.digits === parseInt(digits[0]+'0');
			});
			if (result.length === 1) {
				return result[0].singular + this.calculateOne(digits[1]);
			} else {
				return this.calculateOne(digits[1]);
			}
		}
		//return '';
	}

	private calculateOne(digit: string): string {
		console.log(this.numericTypeTranslationWithTables.ones);
		let result = this.numericTypeTranslationWithTables.ones.filter((one: OneModel) => {
			return one.digits === parseInt(digit);
		});
		if (result.length === 1) {
			return result[0].singular;
		} else {
			return '';
		}
	}

	public calculateInteger(groupOfThree: string, remainingInteger: string, currentWord: string, ): string {
		console.log(groupOfThree);
		console.log(remainingInteger);
		//currentWord += this.calculateHundred(groupOfThree[0], groupOfThree.substring(1));
		currentWord += this.calculateTen(groupOfThree.substring(1));
		//currentWord += this.calculateOne(groupOfThree[2]);
		//currentWord += 'i ';
		if (remainingInteger.length === 0) {
			return currentWord;
		} else if (remainingInteger.length > 3) {
			return this.calculateInteger(remainingInteger.substring(0, 3), remainingInteger.substring(3), currentWord);
		} else {
			return this.calculateInteger(remainingInteger.substring(0, 3), '', currentWord);
		}
		//return currentWord;
	}

	public convertNumberToWord(currentNumber: string) {

		//console.log(language);
		//console.log(numericTypeTranslationWithTables);
		//console.log(currentNumber);

		let newWord = "";
		let integer = "";
		//let decimal = "";
		let decimalPosition = currentNumber.indexOf(',');
		if (decimalPosition === -1) {
			//entire number is integer
			integer = currentNumber;
		} else {
			let secondDecimalPosition = currentNumber.indexOf(',', (decimalPosition + 1));
			if (secondDecimalPosition !== -1) {
				//more than one decimal place, handle error
				return "";
			}
			integer = currentNumber.substring(0, decimalPosition);
			//decimal = currentNumber.substring((decimalPosition + 1));
		}
		integer = integer.replace(/\./g, '');
		
		if ((integer.length % 3) === 0) {
			newWord = this.calculateInteger(integer.substring(0, 3), integer.substring(3), '');
		} else if ((integer.length % 3) === 1) {
			newWord = this.calculateInteger(('00' + integer.substring(0, 1)), integer.substring(1), '');
		} else if ((integer.length % 3) === 2) {
			newWord = this.calculateInteger(('0' + integer.substring(0, 2)), integer.substring(2), '');
		}
		//console.log(integer);
		//console.log(decimal);

		return newWord;

	}

	

}
