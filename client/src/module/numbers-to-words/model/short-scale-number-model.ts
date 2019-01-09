import {action, observable, runInAction} from "mobx";

export interface IShortScaleNumberModelProps {
	language_id?: number;
	exponent?: number;
	singular?: string;
	plural?: string;
}

export default class ShortScaleNumberModel {

	@observable public languageId: number;
	@observable public exponent: number;
	@observable public singular: string;
	@observable public plural: string;

	constructor(props: IShortScaleNumberModelProps) {
		this.setProperties(props);
	}

	@action public setProperties(props: IShortScaleNumberModelProps) {
		runInAction(() => {
			if (props.language_id !== undefined) { this.languageId = props.language_id; }
			if (props.exponent !== undefined) { this.exponent = props.exponent; }
			if (props.singular !== undefined) { this.singular = props.singular; }
			if (props.plural !== undefined) { this.plural = props.plural; }
		});
	}

}
