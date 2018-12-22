import {observer} from "mobx-react";
import * as React from "react";

@observer
export default class NumberInputComponent extends React.Component<any> {

	constructor(props: any) {
		super(props);
	}

	public render() {

		return (
			<div>
				{this.props.currentWord}
			</div>
		);

	}

}