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
		//console.log('focus1');
		if (this.textInput.current) {
			//console.log('focus2');
			//this.textInput.current.focus();
			this.textInput.current.selectionStart = this.props.currentNumberInputComponentCursor;
			this.textInput.current.selectionEnd = this.props.currentNumberInputComponentCursor;
		}
		
		//this.refs.textInput.selectionEnd = this.props.currentNumberInputComponentCursor;
	}

	@autobind
	private handleChange(e: any) {
		//console.log(e);
		//console.log(e.target.value);
		//console.log(e.target.selectionStart);
		//const caret = e.target.selectionStart
		//const element = e.target
		//window.requestAnimationFrame(() => {
		  //element.selectionStart = caret
		  //element.selectionEnd = caret
		//})

		let newNumber = e.target.value;
		let newNumberInputComponentCursor = e.target.selectionStart;
		//if they pressed anything other than a number or delete don't change the cursor
		//check if the current number of digits matches the new number of digits
		//if it does they haven't deleted or added a digit so cursor position should stay the same
		//or just move the format number and check if the existing string matches
		//newNumber = formatNumber()
		this.props.onChange(newNumber, newNumberInputComponentCursor);
	}

	//@autobind
	//private handleFocus(e: any) {
		//console.log('handlefocus');
		//e.target.selectionStart = this.props.currentNumberInputComponentCursor;
		//e.target.selectionEnd = this.props.currentNumberInputComponentCursor;
	//}

	public render() {

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
					//ref="input"
					autoFocus={this.props.forceNumberInputComponentUpdate}
					//onFocus={this.handleFocus}
					//ref={(input) => { this.textInput = input; }}
					ref={this.textInput}
					//onFocus={(e) => {
						//e.target.selectionStart = this.props.currentNumberInputComponentCursor;
					//}}
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