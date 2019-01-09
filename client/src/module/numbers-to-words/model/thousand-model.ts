import {action, observable, runInAction} from "mobx";

export interface IThousandModelProps {
	language_id?: number;
	digits?: number;
	singular?: string;
	plural?: string;
}

export default class ThousandModel {

	@observable public languageId: number;
	@observable public digits: number;
	@observable public singular: string;
	@observable public plural: string;

	constructor(props: IThousandModelProps) {
		this.setProperties(props);
	}

	@action public setProperties(props: IThousandModelProps) {
		runInAction(() => {
			if (props.language_id !== undefined) { this.languageId = props.language_id; }
			if (props.digits !== undefined) { this.digits = props.digits; }
			if (props.singular !== undefined) { this.singular = props.singular; }
			if (props.plural !== undefined) { this.plural = props.plural; }
		});
	}

}
