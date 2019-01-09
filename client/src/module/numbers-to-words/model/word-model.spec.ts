import WordModel, {IWordModelProps} from "./word-model";

describe("WordModel", () => {
	it("can be created", () => {
		const testProps: IWordModelProps = {
			word: 'one',
			number: '000001',
		};
		const testModel = new WordModel(testProps);
		expect(testModel).not.toBeNull();
	});
});
