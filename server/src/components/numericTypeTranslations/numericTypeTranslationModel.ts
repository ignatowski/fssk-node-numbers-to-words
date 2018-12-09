import BaseModel from "../base/baseModel";
import OneModel from "./tables/oneModel";
import TenModel from "./tables/tenModel";
import HundredModel from "./tables/hundredModel";
import ThousandModel from "./tables/thousandModel";
import LargeScaleNumberModel from "./tables/largeScaleNumberModel";

export default class NumericTypeTranslationModel extends BaseModel {
	get tableName() { return "numeric_type_translations"; }
	get idAttribute() { return null; }
	ones() { return this.hasMany(OneModel, "language_id", "language_id"); }
	tens() { return this.hasMany(TenModel, "language_id", "language_id"); }
	hundreds() { return this.hasMany(HundredModel, "language_id", "language_id"); }
	thousands() { return this.hasMany(ThousandModel, "language_id", "language_id"); }
	large_scale_numbers() { return this.hasMany(LargeScaleNumberModel, "language_id", "language_id"); }
}
