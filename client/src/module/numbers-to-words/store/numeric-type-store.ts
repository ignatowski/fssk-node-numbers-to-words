import {action, configure, IObservableArray, observable, runInAction} from "mobx";
import fetchUtil from "../../../util/fetch-util";
import NumericTypeModel, {INumericTypeModelProps} from "../model/numeric-type-model";

configure({
	enforceActions: true, // don't allow editing of state outside of mobx actions
});

export class NumericTypeStore {

	@observable public numericTypes: IObservableArray<NumericTypeModel> = observable.array([]);

	@action public addNumericType(numericType: NumericTypeModel): NumericTypeModel {
		this.numericTypes.push(numericType);
		return numericType;
	}

	@action public async loadNumericTypes(languageId: number): Promise<void> {
		try {
			const numericTypesData: any = await fetchUtil("/api/numericTypes?languageId=" + languageId);
			runInAction(() => {
				this.numericTypes.clear();
				numericTypesData.forEach((numericTypeData: INumericTypeModelProps) => {
					this.addNumericType(new NumericTypeModel(numericTypeData));
				});
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

const numericTypeStore = new NumericTypeStore();
export default numericTypeStore;
