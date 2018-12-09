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
		const currentLanguageId = parseInt(event.target.value);
		this.props.onChange(currentLanguageId);
	}
	

	public render() {

		console.log(this.props.languages);
		const languages = this.props.languages.map((language: LanguageModel) => {
			return (
				<option key={language.id} value={language.id}>
					{language.name}
				</option>
			);
		});
		console.log(languages);

		return (
			<div>
				<select id="language-selector" onChange={this.handleChange} value={this.props.currentLanguageId} >
					{languages}
				</select>
			</div>
		);
	}

}
