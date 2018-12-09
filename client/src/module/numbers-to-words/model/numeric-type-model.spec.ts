import NumericTypeModel, {INumericTypeModelProps} from "./numeric-type-model";

describe("NumericTypeModel", () => {
	it("can be created", () => {
		const testProps: INumericTypeModelProps = {
			id: 1,
			languageid: 1,
			name: "Numbers",
			description: "These are cardinal numbers."
		};
		const testModel = new NumericTypeModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
