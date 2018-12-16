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

interface INumbersToWordsContainerState {
	language: LanguageModel;
	numericTypeTranslations: Array<NumericTypeTranslationModel>;
	numericTypeTranslationWithTables: NumericTypeTranslationModel;
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
			numericTypeTranslationWithTables: new NumericTypeTranslationModel(NumericTypeTranslationModel.prototype)
		}
	}

	@autobind
	private setLanguage(newLanguage: LanguageModel) {
		this.setState(
			{ language: newLanguage },
			this.setNumericTypeTranslations
		);
	}

	@autobind
	private setNumericTypeTranslations() {
		NumericTypeTranslationStore
			.loadNumericTypeTranslations(this.state.language.id)
			.then(() => {
				this.setState(
					{ numericTypeTranslations: NumericTypeTranslationStore.numericTypeTranslations },
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
				this.setState({ numericTypeTranslationWithTables: NumericTypeTranslationStore.numericTypeTranslationWithTables[0] });
			});
	}

	@autobind
	private unsetNumericTypeTranslationWithTables() {
		NumericTypeTranslationStore.unsetNumericTypeTranslationWithTables();
		this.setState({ numericTypeTranslationWithTables: new NumericTypeTranslationModel(NumericTypeTranslationModel.prototype) });
	}

	public isEmpty(obj: any) {
		for(var key in obj) {
			//console.log(key);
			if(obj.hasOwnProperty(key))
				return false;
		}
		return true;
	}

	public render() {

		//console.log(this.state);
		//console.log(LanguageStore);
		//console.log(NumericTypeTranslationStore);

		let languageComponent = null;
		if (this.state && this.state.language && LanguageStore.languages.length > 0) {
			languageComponent =
				<LanguageComponent
					onChange={this.setLanguage}
					languages={LanguageStore.languages}
					language={this.state.language}
				/>;
		}

		//console.log(this.isEmpty(this.state.language));
		let titleComponent = null;
		if (this.state && this.state.language && !this.isEmpty(this.state.language)) {
			titleComponent = <TitleComponent language={this.state.language} />;
		}

		if (this.state) {
			console.log(this.state);
		}
		let numericTypeTranslationComponent = null;
		if (this.state && this.state.numericTypeTranslations && this.state.numericTypeTranslationWithTables && this.state.numericTypeTranslations.length > 0) {
			numericTypeTranslationComponent =
				<NumericTypeTranslationComponent
					onChange={this.setNumericTypeTranslationWithTables}
					numericTypeTranslations={this.state.numericTypeTranslations}
					numericTypeTranslationWithTables={this.state.numericTypeTranslationWithTables}
				/>;
		}

		return (
			<div className="container">
				{languageComponent}
				{titleComponent}
				{numericTypeTranslationComponent}
			</div>
		);

	}

}
