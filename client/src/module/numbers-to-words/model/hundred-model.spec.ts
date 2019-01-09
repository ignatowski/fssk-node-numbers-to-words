import HundredModel, {IHundredModelProps} from "./hundred-model";

describe("HundredModel", () => {
	it("can be created", () => {
		const testProps: IHundredModelProps = {
			language_id: 1,
			digits: 100,
			singular: "hundred",
			plural: "hundred"
		};
		const testModel = new HundredModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
