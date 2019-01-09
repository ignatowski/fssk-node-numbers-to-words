import {observer} from "mobx-react";
import * as React from "react";
import autobind from "autobind-decorator";

@observer
export default class NumberInputComponent extends React.Component<any> {

	private textInput: React.RefObject<HTMLInputElement>;

	constructor(props: any) {
		super(props);
		this.textInput = React.createRef();
	}

	componentDidUpdate() {
		//when the value of the text input is updated and formatted
			//update the cursor position so it doesn't jump to the end
		if (this.textInput.current) {
			this.textInput.current.selectionStart = this.props.currentNumberInputComponentCursor;
			this.textInput.current.selectionEnd = this.props.currentNumberInputComponentCursor;
		}
	}

	@autobind
	private handleChange(e: any) {
		let newNumber = e.target.value;
		let newNumberInputComponentCursor = e.target.selectionStart;
		this.props.onChange(newNumber, newNumberInputComponentCursor);
	}

	public render() {

		//max length of the input field is determined by
			//the largest available exponent in the database
			//plus the number of three digit separators (commas or periods)
		let maxLength = 0;
		if (this.props.numericTypeTranslationWithTables.numericTypeId === 1) {
			maxLength = 135;
		} else if (this.props.numericTypeTranslationWithTables.numericTypeId === 2) {
			maxLength = 167;
		}
		
		return (
			<div className="number-input-component">
				<input
					type="text"
					name="number"
					value={this.props.currentNumber}
					onChange={this.handleChange}
					autoComplete="off"
					maxLength={maxLength}
					autoFocus
					ref={this.textInput}
					className={"fake-class-name-to-force-update-" + this.props.forceNumberInputComponentUpdate}
				/>
				{/*
				We need the non-breaking space in the error field to reserve the vertical space for the error message
				The content of the error div will not be shown unless the whole fieldset has the error class applied
				but if there is no content of this div, the other elements shift up to fill the space and things get
				jumpy when errors appear
				*/}
				{"dsk-Admin-form__error" && <div className={"dsk-Admin-form__error"}>{this.props.numberError ? this.props.numberError : "\u00A0"}</div>}
			</div>
		);

	}

}