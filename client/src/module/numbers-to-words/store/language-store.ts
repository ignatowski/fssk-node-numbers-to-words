import {action, configure, IObservableArray, observable, runInAction} from "mobx";
import fetchUtil from "../../../util/fetch-util";
import LanguageModel, {ILanguageModelProps} from "../model/language-model";

configure({
	enforceActions: true, // don't allow editing of state outside of mobx actions
});

export class LanguageStore {

	@observable public languages: IObservableArray<LanguageModel> = observable.array([]);

	@action public addLanguage(language: LanguageModel): LanguageModel {
		this.languages.push(language);
		return language;
	}

	@action public async loadLanguages(): Promise<void> {
		try {
			const languagesData: any = await fetchUtil("/api/languages");
			runInAction(() => {
				this.languages.clear();
				languagesData.forEach((languageData: ILanguageModelProps) => {
					this.addLanguage(new LanguageModel(languageData));
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

const languageStore = new LanguageStore();
export default languageStore;
