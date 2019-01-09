import ThousandModel, {IThousandModelProps} from "./thousand-model";

describe("ThousandModel", () => {
	it("can be created", () => {
		const testProps: IThousandModelProps = {
			language_id: 1,
			digits: 1000,
			singular: "thousand",
			plural: "thousand"
		};
		const testModel = new ThousandModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
