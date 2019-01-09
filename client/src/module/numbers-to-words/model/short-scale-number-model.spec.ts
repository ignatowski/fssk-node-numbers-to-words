import ShortScaleNumberModel, {IShortScaleNumberModelProps} from "./short-scale-number-model";

describe("ShortScaleNumberModel", () => {
	it("can be created", () => {
		const testProps: IShortScaleNumberModelProps = {
			language_id: 1,
			exponent: 6,
			singular: "million",
			plural: "million"
		};
		const testModel = new ShortScaleNumberModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
