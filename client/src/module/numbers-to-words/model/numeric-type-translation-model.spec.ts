import NumericTypeTranslationModel, {INumericTypeTranslationModelProps} from "./numeric-type-translation-model";

describe("NumericTypeTranslationModel", () => {
	it("can be created", () => {
		const testProps: INumericTypeTranslationModelProps = {
			numeric_type_id: 1,
			language_id: 1,
			order: 1,
			name: "Numbers (Short Scale)",
			description: "These are short scale numbers."
		};
		const testModel = new NumericTypeTranslationModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
