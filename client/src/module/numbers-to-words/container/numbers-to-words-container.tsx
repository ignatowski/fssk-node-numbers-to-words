import {observer} from "mobx-react";
import * as React from "react";
import autobind from "autobind-decorator";
import LanguageComponent from "../component/language-component";
import TitleComponent from "../component/title-component";
import NumericTypeComponent from "../component/numeric-type-component";
import LanguageStore from "../store/language-store";
import NumericTypeStore from "../store/numeric-type-store";
//import NumericTypeModel from "../model/numeric-type-model";

interface INumbersToWordsContainerState {
	currentLanguageId: number;
	numericTypes: any;
}

@observer
export default class NumbersToWordsContainer extends React.Component<{}, INumbersToWordsContainerState> {

	public componentDidMount() {
		LanguageStore.loadLanguages();
		NumericTypeStore.loadNumericTypes(this.state.currentLanguageId)
	}

	constructor(props: any) {
		super(props);
		this.state = {
			currentLanguageId: 1,
			numericTypes: NumericTypeStore.numericTypes
		};
	}

	@autobind
	private changeLanguage(newLanguageId: number) {
		this.setState({ currentLanguageId: newLanguageId });
	}

	public render() {
		return (
			<div className="container">
				<LanguageComponent
					onChange={this.changeLanguage}
					currentLanguageId={this.state.currentLanguageId}
					languages={LanguageStore.languages} />
				<TitleComponent 
					currentLanguageId={this.state.currentLanguageId} />
				<NumericTypeComponent numericTypes={this.state.numericTypes} />
			</div>
		);
	}

}
