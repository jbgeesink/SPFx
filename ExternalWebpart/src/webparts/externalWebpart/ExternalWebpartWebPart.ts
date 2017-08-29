import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPComponentLoader } from "@microsoft/sp-loader";

import styles from './ExternalWebpart.module.scss';
import * as strings from 'externalWebpartStrings';
import { IExternalWebpartWebPartProps } from './IExternalWebpartWebPartProps';

import "jquery";
import * as angular from "angular";
import "kendo";

import "./app/app.module";

export default class ExternalWebpartWebPart extends BaseClientSideWebPart<IExternalWebpartWebPartProps> {

  private $injector: angular.auto.IInjectorService;

  protected onInit(): Promise<void> {
    const promise: Promise<void> = new Promise<void>((resolve: () => void, reject: () => void) => {
      resolve();
    });

    SPComponentLoader.loadCss(`https://kendo.cdn.telerik.com/2017.2.621/styles/kendo.common-office365.min.css`); 
    SPComponentLoader.loadCss(`https://kendo.cdn.telerik.com/2017.2.621/styles/kendo.office365.min.css`); 
    SPComponentLoader.loadCss(`https://kendo.cdn.telerik.com/2017.2.621/styles/kendo.office365.mobile.min.css`);

    return promise;
  }


  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `
        <div class="${styles.externalWebpart}" ng-controller="HomeController as vm">
          <div class="${styles.container}">
            <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
              <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
                <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
                <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
                <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
                <a href="https://aka.ms/spfx" class="${styles.button}">
                  <span class="${styles.label}">Learn more</span>
                </a>
                <div>
                  <button kendo-button="vm.kendoButton" ng-click="vm.testClick()">Kendo Click</button>
                </div>
                <div>
                  Date: <input kendo-date-picker="vm.datePicker" /> 
                </div>
              </div>
            </div>
          </div>
        </div>`;

      this.$injector = angular.bootstrap(this.domElement, ['ExternalWebpart']);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
