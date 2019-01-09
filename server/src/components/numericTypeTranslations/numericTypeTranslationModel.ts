import BaseModel from "../base/baseModel";
import OneModel from "./tables/oneModel";
import TenModel from "./tables/tenModel";
import HundredModel from "./tables/hundredModel";
import ThousandModel from "./tables/thousandModel";
import ShortScaleNumberModel from "./tables/shortScaleNumberModel";
import LongScaleNumberModel from "./tables/longScaleNumberModel";

export default class NumericTypeTranslationModel extends BaseModel {
	get tableName() { return "numeric_type_translations"; }
	get idAttribute() { return null; }
	ones() { return this.hasMany(OneModel, "language_id", "language_id"); }
	tens() { return this.hasMany(TenModel, "language_id", "language_id"); }
	hundreds() { return this.hasMany(HundredModel, "language_id", "language_id"); }
	thousands() { return this.hasMany(ThousandModel, "language_id", "language_id"); }
	short_scale_numbers() { return this.hasMany(ShortScaleNumberModel, "language_id", "language_id"); }
	long_scale_numbers() { return this.hasMany(LongScaleNumberModel, "language_id", "language_id"); }
}
