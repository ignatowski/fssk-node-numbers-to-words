import LongScaleNumberModel, {ILongScaleNumberModelProps} from "./long-scale-number-model";

describe("LongScaleNumberModel", () => {
	it("can be created", () => {
		const testProps: ILongScaleNumberModelProps = {
			language_id: 1,
			exponent: 6,
			singular: "million",
			plural: "million"
		};
		const testModel = new LongScaleNumberModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
