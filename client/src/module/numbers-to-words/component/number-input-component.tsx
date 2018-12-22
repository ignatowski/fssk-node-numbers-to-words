import {observer} from "mobx-react";
import * as React from "react";
import autobind from "autobind-decorator";
import FormInput from "../../common/component/form-input-component";

@observer
export default class NumberInputComponent extends React.Component<any> {

	constructor(props: any) {
		super(props);
	}

	@autobind
	private handleChange(name: string, value: string) {
		//console.log(value);
		const newNumber = value;
		this.props.onChange(newNumber);
	}

	public render() {

		return (
			<div>
				<FormInput
					type="text"
					name="number"
					autoFocus
					value={this.props.currentNumber}
					error={this.props.numberError}
					onChange={this.handleChange}
					errorClass="dsk-Admin-form__error"
					autoComplete="off"
				/>
			</div>
		);

	}

}