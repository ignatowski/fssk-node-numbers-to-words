import {observer} from "mobx-react";
import * as React from "react";
import autobind from "autobind-decorator";
import LanguageComponent from "../component/language-component";
import LanguageStore from "../store/language-store";
import LanguageModel from "../model/language-model";
import TitleComponent from "../component/title-component";
import NumericTypeTranslationComponent from "../component/numeric-type-translation-component";
import NumericTypeTranslationStore from "../store/numeric-type-translation-store";
import NumericTypeTranslationModel from "../model/numeric-type-translation-model";
import WordModel from "../model/word-model";
import NumberInputComponent from "../component/number-input-component";
import {formatNumber} from "../../../util/number-util";
import {validateNumber} from "../../../util/number-validation";
import {isEmptyObject} from "../../../util/util";
import NumberToWordConverter from "../../../util/number-to-word-converter";
import WordOutputComponent from "../component/word-output-component";

interface INumbersToWordsContainerState {
	language: LanguageModel;
	numericTypeTranslations: Array<NumericTypeTranslationModel>;
	numericTypeTranslationWithTables: NumericTypeTranslationModel;
	currentNumber: string;
	currentNumberInputComponentCursor: number;
	numberError: string;
	currentWord: Array<WordModel>;
	forceNumberInputComponentUpdate: boolean;
}

@observer
export default class NumbersToWordsContainer extends React.Component<{}, INumbersToWordsContainerState> {

	public componentDidMount() {
		LanguageStore
			.loadLanguages()
			.then(() => {
				this.setLanguage(LanguageStore.languages[1]);
			});
	}

	constructor(props: any) {
		super(props);
		this.state = {
			language: new LanguageModel(LanguageModel.prototype),
			numericTypeTranslations: new Array<NumericTypeTranslationModel>(),
			numericTypeTranslationWithTables: new NumericTypeTranslationModel(NumericTypeTranslationModel.prototype),
			currentNumber: "",
			currentNumberInputComponentCursor: 0,
			numberError: "",
			currentWord: [],
			forceNumberInputComponentUpdate: true
		}
	}

	@autobind
	private setLanguage(newLanguage: LanguageModel) {
		this.setState(
			{
				language: newLanguage,
				currentNumber: "",
				currentNumberInputComponentCursor: 0,
				numberError: "",
				currentWord: []
			},
			this.setNumericTypeTranslations
		);
	}

	@autobind
	private setNumericTypeTranslations() {
		NumericTypeTranslationStore
			.loadNumericTypeTranslations(this.state.language.id)
			.then(() => {
				this.setState(
					{
						numericTypeTranslations: NumericTypeTranslationStore.numericTypeTranslations,
						currentNumber: "",
						currentNumberInputComponentCursor: 0,
						numberError: "",
						currentWord: []
					},
					() => {
						if (this.state.numericTypeTranslations.length > 0) {
							this.setNumericTypeTranslationWithTables(this.state.numericTypeTranslations[0].numericTypeId);
						} else {
							this.unsetNumericTypeTranslationWithTables();
						}
					}
				);
			});
	}

	@autobind
	private setNumericTypeTranslationWithTables(numericTypeId: number) {
		NumericTypeTranslationStore
			.loadNumericTypeTranslationWithTables(numericTypeId, this.state.language.id)
			.then(() => {
				this.setState(
					{
						numericTypeTranslationWithTables: NumericTypeTranslationStore.numericTypeTranslationWithTables[0],
						currentNumber: "",
						currentNumberInputComponentCursor: 0,
						numberError: "",
						currentWord: []
					}
				);
			});
	}

	@autobind
	private unsetNumericTypeTranslationWithTables() {
		NumericTypeTranslationStore.unsetNumericTypeTranslationWithTables();
		this.setState(
			{
				numericTypeTranslationWithTables: new NumericTypeTranslationModel(NumericTypeTranslationModel.prototype),
				currentNumber: "",
				currentNumberInputComponentCursor: 0,
				numberError: "",
				currentWord: []
			}
		);
	}

	@autobind
	private setCurrentNumber(newNumber: string, newNumberInputComponentCursor: number) {
		//console.log(newNumberInputComponentCursor);
		//e.target.selectionStart = this.state.currentNumberInputComponentCursor;
		//e.target.selectionEnd = this.state.currentNumberInputComponentCursor;
		let newNumberLength = newNumber.length;
		//console.log(newNumberLength);
		newNumber = formatNumber(newNumber, this.state.numericTypeTranslationWithTables.numericTypeId, this.state.language.id)
		
		//let countValidNewNumbers = newNumber.length - this.state.currentNumber.length;

		/*
		if (countValidNewNumbers === 0) {

			//no new numbers added

			let difference = newNumber.length - newNumberLength;

			if (difference === 0) {
				//no invalid characters were added
				console.log('case1');
			} else if (difference > 0) {
				//three digit separators were removed and added back
				//increase the cursor by the difference
				console.log('case2');
				while (difference > 0) {
					newNumberInputComponentCursor++;
					difference--;
				}
			} else if (difference < 0) {
				//invalid characters were added and removed
				//decrease the cursor by the difference
				console.log('case3');
				while (difference < 0) {
					newNumberInputComponentCursor--;
					difference++;
				}
			}
*/
		//} else if (countValidNewNumbers > 0) {

			//new numbers added

			let difference = newNumber.length - newNumberLength;

			if (difference === 0) {
				//the difference between: 
					//valid numbers, invalid characters, addition/removal of three digit separaters
					//is zero
					//so everything evens out and the cursor is at the correct spot
				//console.log('case4');
			} else if (difference > 0) {
				//three digit separators were added
				//increase the cursor by the difference
				//console.log('case5');
				while (difference > 0) {
					newNumberInputComponentCursor++;
					difference--;
				}
			} else if (difference < 0) {
				//invalid characters were removed and/or three digit separaters were removed
				//special case to make sure cursor position is zero or greater
				//decrease the cursor by the difference
				//console.log('case6');
				while (difference < 0 && newNumberInputComponentCursor > 0) {
					newNumberInputComponentCursor--;
					difference++;
				}
			}

		//}
		
		/*
		//if the number hasn't changed don't change the cursor position
		if (newNumber === this.state.currentNumber) {
			//newNumberInputComponentCursor = this.state.currentNumberInputComponentCursor;
			if (newNumberLength > this.state.currentNumber.length) {
				//a character was added that wasn't allowed, move the cursor back one
				newNumberInputComponentCursor--;
			}
			if (newNumberLength < this.state.currentNumber.length) {
				//a character was deleted that wasn't allowed, move the cursor forward one
				newNumberInputComponentCursor++;
			}
			if (newNumberLength === this.state.currentNumber.length) {
				//a character was deleted that wasn't allowed, move the cursor forward one
				//newNumberInputComponentCursor++;
				console.log('user pasted in data???');
			}
		} else {
			//check if the number has grown by more than one character (three digit separator added)
			//or user pasted in data???
			if (newNumber.length - this.state.currentNumber.length > 1) {
				let difference = newNumber.length - newNumberLength;
				while (difference > 0) {
					newNumberInputComponentCursor++;
					difference--;
				}
			}
			//check if the number has shrunk by more than one character (three digit separator removed)
			if (this.state.currentNumber.length - newNumber.length > 1) {
				let difference = newNumberLength - newNumber.length;
				while (difference > 0) {
					newNumberInputComponentCursor--;
					difference--;
				}
			}
		}
		*/
		this.setState(
			{
				currentNumber: newNumber,
				currentNumberInputComponentCursor: newNumberInputComponentCursor,
				numberError: validateNumber(newNumber, this.state.numericTypeTranslationWithTables.numericTypeId, this.state.language.id),
				currentWord: [],
				forceNumberInputComponentUpdate: !this.state.forceNumberInputComponentUpdate
			},
			this.setCurrentWord
		);
	}

	@autobind
	private setCurrentWord() {
		if (!this.state.numberError) {
			let numberToWordConverter = new NumberToWordConverter(this.state.numericTypeTranslationWithTables, this.state.currentNumber);
			this.setState(
				{
					currentWord: numberToWordConverter.convertNumberToWord()
				}
			);
		}
	}

	public render() {

		let languageId = '';
		let languageComponent = null;
		let titleComponent = null;
		if (this.state && this.state.language && !isEmptyObject(this.state.language) && LanguageStore.languages.length > 0) {
			languageId = this.state.language.id.toString();
			languageComponent =
				<LanguageComponent
					onChange={this.setLanguage}
					languages={LanguageStore.languages}
					language={this.state.language}
				/>;
			titleComponent = <TitleComponent language={this.state.language} />;
		}

		let numericTypeTranslationComponent = null;
		let numberInputComponent = null;
		let wordOutputComponent = null;
		if (this.state && this.state.numericTypeTranslations && this.state.numericTypeTranslationWithTables && !isEmptyObject(this.state.numericTypeTranslationWithTables) && this.state.numericTypeTranslations.length > 0) {
			numericTypeTranslationComponent =
				<NumericTypeTranslationComponent
					onChange={this.setNumericTypeTranslationWithTables}
					numericTypeTranslations={this.state.numericTypeTranslations}
					numericTypeTranslationWithTables={this.state.numericTypeTranslationWithTables}
				/>;
			numberInputComponent = 
				<NumberInputComponent
					onChange={this.setCurrentNumber}
					numberError={this.state.numberError}
					currentNumber={this.state.currentNumber}
					currentNumberInputComponentCursor={this.state.currentNumberInputComponentCursor}
					numericTypeTranslationWithTables={this.state.numericTypeTranslationWithTables}
					forceNumberInputComponentUpdate={this.state.forceNumberInputComponentUpdate}
				/>;
			if (this.state.currentWord) {
				wordOutputComponent = <WordOutputComponent currentWord={this.state.currentWord} />;
			}
		}

		return (
			<div className={"language-id-" + languageId + " numbers-to-words-container"}>
				{languageComponent}
				<div className="container">
					{titleComponent}
					{numericTypeTranslationComponent}
					{numberInputComponent}
					{wordOutputComponent}
				</div>
			</div>
		);

	}

}
