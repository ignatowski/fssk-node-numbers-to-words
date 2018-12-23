import * as React from "react";

export default class WordComponent extends React.Component<any> {

	constructor(props: any) {
		super(props);
	}

	public render() {
		return <p className="word-component" title={this.props.word.number}>{this.props.word.word}</p>;
	}

}
