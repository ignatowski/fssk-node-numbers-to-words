import {action, observable, runInAction} from "mobx";
import OneModel from "./one-model";
import TenModel from "./ten-model";
import HundredModel from "./hundred-model";
import ThousandModel from "./thousand-model";
import ShortScaleNumberModel from "./short-scale-number-model";
import LongScaleNumberModel from "./long-scale-number-model";

export interface INumericTypeTranslationModelProps {
	numeric_type_id?: number;
	language_id?: number;
	order?: number;
	name?: string;
	description?: string;
	tables?: Array<string>;
	ones?: Array<OneModel>;
	tens?: Array<TenModel>;
	hundreds?: Array<HundredModel>;
	thousands?: Array<ThousandModel>;
	short_scale_numbers?: Array<ShortScaleNumberModel>;
	long_scale_numbers?: Array<LongScaleNumberModel>;
}

export default class NumericTypeTranslationModel {

	@observable public numericTypeId: number;
	@observable public languageId: number;
	@observable public order: number;
	@observable public name: string;
	@observable public description: string;
	@observable public tables: Array<string>;
	@observable public ones: Array<OneModel>;
	@observable public tens: Array<TenModel>;
	@observable public hundreds: Array<HundredModel>;
	@observable public thousands: Array<ThousandModel>;
	@observable public shortScaleNumbers: Array<ShortScaleNumberModel>;
	@observable public longScaleNumbers: Array<LongScaleNumberModel>;

	constructor(props: INumericTypeTranslationModelProps) {
		this.setProperties(props);
	}

	@action public setProperties(props: INumericTypeTranslationModelProps) {
		runInAction(() => {
			if (props.numeric_type_id) { this.numericTypeId = props.numeric_type_id; }
			if (props.language_id) { this.languageId = props.language_id; }
			if (props.order) { this.order = props.order; }
			if (props.name) { this.name = props.name; }
			if (props.description) { this.description = props.description; }
			if (props.tables) { this.tables = props.tables; }
			if (props.ones) { this.ones = props.ones; }
			if (props.tens) { this.tens = props.tens; }
			if (props.hundreds) { this.hundreds = props.hundreds; }
			if (props.thousands) { this.thousands = props.thousands; }
			if (props.short_scale_numbers) { this.shortScaleNumbers = props.short_scale_numbers; }
			if (props.long_scale_numbers) { this.longScaleNumbers = props.long_scale_numbers; }
		});
	}

}
