import {action, observable, runInAction} from "mobx";

export interface IHundredModelProps {
	language_id?: number;
	digits?: number;
	singular?: string;
	plural?: string;
}

export default class HundredModel {

	@observable public languageId: number;
	@observable public digits: number;
	@observable public singular: string;
	@observable public plural: string;

	constructor(props: IHundredModelProps) {
		this.setProperties(props);
	}

	@action public setProperties(props: IHundredModelProps) {
		runInAction(() => {
			if (props.language_id !== undefined) { this.languageId = props.language_id; }
			if (props.digits !== undefined) { this.digits = props.digits; }
			if (props.singular !== undefined) { this.singular = props.singular; }
			if (props.plural !== undefined) { this.plural = props.plural; }
		});
	}

}
