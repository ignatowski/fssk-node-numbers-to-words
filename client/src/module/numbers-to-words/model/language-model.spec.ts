import LanguageModel, {ILanguageModelProps} from "./language-model";

describe("LanguageModel", () => {
	it("can be created", () => {
		const testProps: ILanguageModelProps = {
			id: 1,
			name: "Hello"
		};
		const testModel = new LanguageModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
