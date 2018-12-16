import {action, configure, IObservableArray, observable, runInAction} from "mobx";
import fetchUtil from "../../../util/fetch-util";
import NumericTypeTranslationModel, {INumericTypeTranslationModelProps} from "../model/numeric-type-translation-model";
import OneModel, {IOneModelProps} from "../model/one-model";

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
				this.numericTypeTranslationWithTables.clear();
				console.log(numericTypeTranslationData);
				numericTypeTranslationData.onesModels = Array<OneModel>();
				numericTypeTranslationData.ones.forEach((one: IOneModelProps) => {
					numericTypeTranslationData.onesModels.push(new OneModel(one));
				});
				delete numericTypeTranslationData.ones;
				numericTypeTranslationData.ones = JSON.parse(JSON.stringify(numericTypeTranslationData.onesModels));
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
