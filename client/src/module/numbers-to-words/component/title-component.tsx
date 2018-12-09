import * as React from "react";

export default class TitleComponent extends React.Component<any> {

	constructor(props: any) {
		super(props);
	}

	private getTitle(languageId: number) {
		const titles = [
			{
				languageId: 1,
				name: "Numbers to Words"
			},
			{
				languageId: 2,
				name: "Numeros a Palabras"
			}
		];
		const title = titles.filter(title => {
			return title.languageId === languageId;
		})[0];
		return title.name;
	}

	public render() {
		const title = this.getTitle(this.props.currentLanguageId);
		document.title = title;
		return <div><h1>{title}</h1></div>;
	}

}
