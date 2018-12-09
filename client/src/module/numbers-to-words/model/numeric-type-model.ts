import {action, observable, runInAction} from "mobx";

export interface INumericTypeModelProps {
	id?: number;
	languageid?: number;
	name?: string;
	description?: string;
}

export default class NumericTypeModel {

	@observable public id: number;
	@observable public languageId: number;
	@observable public name: string;
	@observable public description: string;

	constructor(props: INumericTypeModelProps) {
		this.setProperties(props);
	}

	@action public setProperties(props: INumericTypeModelProps) {
		runInAction(() => {
			if (props.id) { this.id = props.id; }
			if (props.languageid) { this.languageId = props.languageid; }
			if (props.name) { this.name = props.name; }
			if (props.description) { this.name = props.description; }
		});
	}

}
