import {action, configure, IObservableArray, observable, runInAction} from "mobx";
import fetchUtil from "../../../util/fetch-util";
import NumericTypeTranslationModel, {INumericTypeTranslationModelProps} from "../model/numeric-type-translation-model";
import OneModel, {IOneModelProps} from "../model/one-model";
import TenModel, {ITenModelProps} from "../model/ten-model";
import HundredModel, {IHundredModelProps} from "../model/hundred-model";
import ThousandModel, {IThousandModelProps} from "../model/thousand-model";
import ShortScaleNumberModel, {IShortScaleNumberModelProps} from "../model/short-scale-number-model";
import LongScaleNumberModel, {ILongScaleNumberModelProps} from "../model/long-scale-number-model";

configure({
	enforceActions: true, // don't allow editing of state outside of mobx actions
});

export class NumericTypeTranslationStore {

	@observable public numericTypeTranslations: IObservableArray<NumericTypeTranslationModel> = observable.array([]);
	@observable public numericTypeTranslationWithTables: IObservableArray<NumericTypeTranslationModel> = observable.array([]);

	@action public addNumericTypeTranslation(numericTypeTranslation: NumericTypeTranslationModel): NumericTypeTranslationModel {
		this.numericTypeTranslations.push(numericTypeTranslation);
		return numericTypeTranslation;
	}

	@action public setNumericTypeTranslationWithTables(numericTypeTranslation: NumericTypeTranslationModel): NumericTypeTranslationModel {
		this.numericTypeTranslationWithTables.push(numericTypeTranslation);
		return numericTypeTranslation;
	}

	@action public unsetNumericTypeTranslationWithTables(): void {
		this.numericTypeTranslationWithTables.clear();
	}

	@action public async loadNumericTypeTranslations(languageId: number): Promise<void> {
		try {
			const numericTypeTranslationsData: any = await fetchUtil("/api/numericTypeTranslations/languages/" + languageId);
			runInAction(() => {
				this.numericTypeTranslations.clear();
				numericTypeTranslationsData.forEach((numericTypeTranslationData: INumericTypeTranslationModelProps) => {
					this.addNumericTypeTranslation(new NumericTypeTranslationModel(numericTypeTranslationData));
				});
			});
		} catch (error) {
			this.handleError(error);
		}
	}

	@action public async loadNumericTypeTranslationWithTables(numericTypeId: number, languageId: number): Promise<void> {
		try {
			const numericTypeTranslationData: any = await fetchUtil("/api/numericTypeTranslations/numericTypes/" + numericTypeId + "/languages/" + languageId + "/withTables");
			runInAction(() => {

				//clear existing data
				this.numericTypeTranslationWithTables.clear();

				//add ones
				if (numericTypeTranslationData.hasOwnProperty('ones')) {
					numericTypeTranslationData.onesModels = Array<OneModel>();
					numericTypeTranslationData.ones.forEach((one: IOneModelProps) => {
						numericTypeTranslationData.onesModels.push(new OneModel(one));
					});
					delete numericTypeTranslationData.ones;
					numericTypeTranslationData.ones = JSON.parse(JSON.stringify(numericTypeTranslationData.onesModels));
				}

				//add tens
				if (numericTypeTranslationData.hasOwnProperty('tens')) {
					numericTypeTranslationData.tensModels = Array<TenModel>();
					numericTypeTranslationData.tens.forEach((ten: ITenModelProps) => {
						numericTypeTranslationData.tensModels.push(new TenModel(ten));
					});
					delete numericTypeTranslationData.tens;
					numericTypeTranslationData.tens = JSON.parse(JSON.stringify(numericTypeTranslationData.tensModels));
				}

				//add hundreds
				if (numericTypeTranslationData.hasOwnProperty('hundreds')) {
					numericTypeTranslationData.hundredsModels = Array<HundredModel>();
					numericTypeTranslationData.hundreds.forEach((hundred: IHundredModelProps) => {
						numericTypeTranslationData.hundredsModels.push(new HundredModel(hundred));
					});
					delete numericTypeTranslationData.hundreds;
					numericTypeTranslationData.hundreds = JSON.parse(JSON.stringify(numericTypeTranslationData.hundredsModels));
				}

				//add thousands
				if (numericTypeTranslationData.hasOwnProperty('thousands')) {
					numericTypeTranslationData.thousandsModels = Array<ThousandModel>();
					numericTypeTranslationData.thousands.forEach((thousand: IThousandModelProps) => {
						numericTypeTranslationData.thousandsModels.push(new ThousandModel(thousand));
					});
					delete numericTypeTranslationData.thousands;
					numericTypeTranslationData.thousands = JSON.parse(JSON.stringify(numericTypeTranslationData.thousandsModels));
				}

				//add shortScaleNumbers
				if (numericTypeTranslationData.hasOwnProperty('short_scale_numbers')) {
					numericTypeTranslationData.shortScaleNumbersModels = Array<ShortScaleNumberModel>();
					numericTypeTranslationData.short_scale_numbers.forEach((short_scale_number: IShortScaleNumberModelProps) => {
						numericTypeTranslationData.shortScaleNumbersModels.push(new ShortScaleNumberModel(short_scale_number));
					});
					delete numericTypeTranslationData.short_scale_numbers;
					numericTypeTranslationData.short_scale_numbers = JSON.parse(JSON.stringify(numericTypeTranslationData.shortScaleNumbersModels));
				}

				//add longScaleNumbers
				if (numericTypeTranslationData.hasOwnProperty('long_scale_numbers')) {
					numericTypeTranslationData.longScaleNumbersModels = Array<LongScaleNumberModel>();
					numericTypeTranslationData.long_scale_numbers.forEach((long_scale_number: ILongScaleNumberModelProps) => {
						numericTypeTranslationData.longScaleNumbersModels.push(new LongScaleNumberModel(long_scale_number));
					});
					delete numericTypeTranslationData.long_scale_numbers;
					numericTypeTranslationData.long_scale_numbers = JSON.parse(JSON.stringify(numericTypeTranslationData.longScaleNumbersModels));
				}

				//set numericTypeTranslationWithTables
				this.setNumericTypeTranslationWithTables(new NumericTypeTranslationModel(numericTypeTranslationData));

			});
		} catch (error) {
			this.handleError(error);
		}
	}

	private handleError(error: Error) {
		// @todo report this error, somehow...?
		console.error(error);
	}

}

const numericTypeTranslationStore = new NumericTypeTranslationStore();
export default numericTypeTranslationStore;
