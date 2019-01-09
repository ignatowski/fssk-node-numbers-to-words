import {action, observable, runInAction} from "mobx";

export interface IWordModelProps {
	word?: string;
	number?: string;
}

export default class WordModel {

	@observable public word: string;
	@observable public number: string;

	constructor(props: IWordModelProps) {
		this.setProperties(props);
	}

	@action public setProperties(props: IWordModelProps) {
		runInAction(() => {
			if (props.word !== undefined) { this.word = props.word; }
			if (props.number !== undefined) { this.number = props.number; }
		});
	}

}
