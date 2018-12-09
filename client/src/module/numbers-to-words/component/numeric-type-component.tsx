import {observer} from "mobx-react";
import * as React from "react";
//import autobind from "autobind-decorator";
import NumericTypeModel from "../model/numeric-type-model";

@observer
export default class NumericTypeComponent extends React.Component<any> {

	constructor(props: any) {
		super(props);
	}

	/*
	@autobind
	private handleChange(event: any) {
		const currentNumericTypeId = parseInt(event.target.value);
		this.props.onChange(currentNumericTypeId);
	}
	*/

	public render() {

		console.log(this.props.numericTypes);
		const numericTypes = this.props.numericTypes.map((currentNumericType: NumericTypeModel) => {
			return (
				<option key={currentNumericType.id} value={currentNumericType.id}>
					{currentNumericType.name}
				</option>
			);
		});
		console.log(numericTypes);

		return (
			<div>
				<select id="numericType-selector" value={this.props.currentNumericTypeId} >
					{numericTypes}
				</select>
			</div>
		);
	}

}
