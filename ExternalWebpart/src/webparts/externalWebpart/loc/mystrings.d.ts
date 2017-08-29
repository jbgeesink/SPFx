declare interface IExternalWebpartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'externalWebpartStrings' {
  const strings: IExternalWebpartStrings;
  export = strings;
}
