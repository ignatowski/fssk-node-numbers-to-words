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
				this.setLanguage(LanguageStore.languages[0]);
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

		//this is the original length of the user input
			//without invalid characters removed
			//and without three digit characters (commas and periods) added/removed 
		let newNumberLength = newNumber.length;

		//remove invalid characters from the user input
			//and add/remove three digit characters (commas and periods)
		newNumber = formatNumber(newNumber, this.state.numericTypeTranslationWithTables.numericTypeId, this.state.language.id)

		//lenght of the formatted user input minus the original user input
		let difference = newNumber.length - newNumberLength;

		//modify the position of the cursor as needed
			//based on:
				//what the user typed (1 character removed or deleted)
				//pasted in
				//selected and pasted over
				//selected and deleted
			
		if (difference === 0) {
			//the difference between: 
				//valid numbers, invalid characters, addition/removal of three digit separaters is zero
				//so everything evens out and the cursor is at the correct spot
		} else if (difference > 0) {
			//three digit separators were added
				//so increase the cursor (move to the right) by the difference
			while (difference > 0) {
				newNumberInputComponentCursor++;
				difference--;
			}
		} else if (difference < 0) {
			//invalid characters were removed and/or three digit separaters were removed
				//so decrease the cursor by the difference
			//special case to make sure cursor position is zero or greater
			while (difference < 0 && newNumberInputComponentCursor > 0) {
				newNumberInputComponentCursor--;
				difference++;
			}
		}

		//forceNumberInputComponentUpdate is a boolean that always flips and forces the component to update
			//this handles the special case where the user pastes the same number(s) over identical number(s)
			//and prevents the cursor from jumping to the end of the input
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
