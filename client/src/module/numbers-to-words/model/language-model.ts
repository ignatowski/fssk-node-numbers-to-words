import {action, observable, runInAction} from "mobx";

export interface ILanguageModelProps {
	id?: number;
	name?: string;
}

export default class LanguageModel {

	@observable public id: number;
	@observable public name: string;

	constructor(props: ILanguageModelProps) {
		this.setProperties(props);
	}

	@action public setProperties(props: ILanguageModelProps) {
		runInAction(() => {
			if (props.id) { this.id = props.id; }
			if (props.name) { this.name = props.name; }
		});
	}

}
