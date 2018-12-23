import {observer} from "mobx-react";
import * as React from "react";
import autobind from "autobind-decorator";
import LanguageModel from "../model/language-model";

@observer
export default class LanguageComponent extends React.Component<any> {

	constructor(props: any) {
		super(props);
	}

	@autobind
	private handleChange(event: any) {
		const newLangaugeId = parseInt(event.target.value);
		const newLanguage = this.props.languages.filter((language: LanguageModel) => {
			return language.id === newLangaugeId;
		})[0];
		this.props.onChange(newLanguage);
	}
	

	public render() {

		const languages = this.props.languages.map((language: LanguageModel) => {
			return (
				<option key={language.id} value={language.id}>
					{language.name}
				</option>
			);
		});

		return (
			<div className="language-component">
				<p>Language: 
					<select onChange={this.handleChange} value={this.props.language.id} >
						{languages}
					</select>
				</p>
			</div>
		);

	}

}
