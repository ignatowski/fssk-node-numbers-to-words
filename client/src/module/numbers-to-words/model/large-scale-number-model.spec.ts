import LargeScaleNumberModel, {ILargeScaleNumberModelProps} from "./large-scale-number-model";

describe("LargeScaleNumberModel", () => {
	it("can be created", () => {
		const testProps: ILargeScaleNumberModelProps = {
			language_id: 1,
			exponent: 6,
			singular: "million",
			plural: "million"
		};
		const testModel = new LargeScaleNumberModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
