import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';

import * as strings from 'UserManagementWebPartStrings';
import {
  loadTheme,
} from 'office-ui-fabric-react/lib/Styling';
import { IUserManagementWebPartProps } from './IUserManagementWebPartProps';
import Main from './components/main';

export default class UserManagementWebPart extends BaseClientSideWebPart<IUserManagementWebPartProps> {

  constructor() {
    super();
  }

  public render(): void {
    this.loadTheme();
    
    const webpart: React.ReactElement<IUserManagementWebPartProps> = React.createElement(
      Main,
      {
        endPoint: this.properties.endPoint,
        title: this.properties.title,
        description: this.properties.description,
      }
    );

    ReactDom.render(webpart, this.domElement);
  }

 

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onPropertyPaneConfigurationStart(): void {
    // this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'user management web part');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    // this.context.propertyPane.refresh();
    // this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    // this.render();
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

                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('endPoint', {
                  label: strings.EndPointFieldLabel
                })
              ]
            }
          ]
        }
      ]
    }
  }

  private loadTheme = (): void => {
    loadTheme({
      palette: {
        themePrimary: '#515a9a',
        themeLighterAlt: '#030406',
        themeLighter: '#0d0e18',
        themeLight: '#181b2e',
        themeTertiary: '#31365c',
        themeSecondary: '#474f87',
        themeDarkAlt: '#5e66a3',
        themeDark: '#7279b1',
        themeDarker: '#9298c6',
        neutralLighterAlt: '#f8f8f8',
        neutralLighter: '#f4f4f4',
        neutralLight: '#eaeaea',
        neutralQuaternaryAlt: '#dadada',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c8c8',
        neutralTertiary: '#9fa6d1',
        neutralSecondary: '#555fa3',
        neutralPrimaryAlt: '#242f78',
        neutralPrimary: '#141f66',
        neutralDark: '#10184e',
        black: '#0b1239',
        white: '#ffffff',
      },
    });
  };
}
