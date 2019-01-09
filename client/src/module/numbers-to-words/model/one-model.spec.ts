import OneModel, {IOneModelProps} from "./one-model";

describe("OneModel", () => {
	it("can be created", () => {
		const testProps: IOneModelProps = {
			language_id: 1,
			digits: 2,
			singular: "two",
			plural: "two"
		};
		const testModel = new OneModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
