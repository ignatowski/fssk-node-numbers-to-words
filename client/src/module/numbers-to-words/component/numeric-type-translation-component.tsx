import {observer} from "mobx-react";
import * as React from "react";
import autobind from "autobind-decorator";
import NumericTypeTranslationModel from "../model/numeric-type-translation-model";

@observer
export default class NumericTypeTranslationComponent extends React.Component<any> {

	constructor(props: any) {
		super(props);
	}

	@autobind
	private handleChange(event: any) {
		const newNumericTypeTranslationId = parseInt(event.target.value);
		this.props.onChange(newNumericTypeTranslationId);
	}

	public render() {

		const numericTypeTranslations = this.props.numericTypeTranslations.map((numericTypeTranslation: NumericTypeTranslationModel) => {
			return (
				<option key={numericTypeTranslation.numericTypeId} value={numericTypeTranslation.numericTypeId}>
					{numericTypeTranslation.name}
				</option>
			);
		});

		return (
			<div className="numeric-type-translation-component">
				<span>
					<span>
						<span>
							<span>
								<select onChange={this.handleChange} value={this.props.numericTypeTranslationWithTables.numericTypeId} >
									{numericTypeTranslations}
								</select>
							</span>
						</span>
					</span>
				</span>
				<div className="description">
					<p dangerouslySetInnerHTML={{ __html: this.props.numericTypeTranslationWithTables.description }}></p>
				</div>
			</div>
		);

	}

}
