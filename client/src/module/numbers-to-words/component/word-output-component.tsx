import {observer} from "mobx-react";
import * as React from "react";
import WordModel from "../model/word-model";
import WordComponent from "./word-component";

@observer
export default class NumberInputComponent extends React.Component<any> {

	constructor(props: any) {
		super(props);
	}

	public render() {

		const words = this.props.currentWord.filter((word: WordModel) => {
			return word.word !== '';
		}).map((word: WordModel) => {
			return (
				<WordComponent word={word} />
			);
		});

		return (
			<div className="word-output-component">
				{words}
			</div>
		);

	}

}