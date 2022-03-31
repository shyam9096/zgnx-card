import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "ZogenixCardsWebPartStrings";
import ZogenixCards from "./components/ZogenixCards";
import { IZogenixCardsProps } from "./components/IZogenixCardsProps";
import { PropertyFieldRichTextBox } from "sp-client-custom-fields/lib/PropertyFieldRichTextBox";

export interface IZogenixCardsWebPartProps {
  description: string;
  ImgUrl: any;
  Title: string;
  RedirectionUrl: any;
  DescriptionPara: any;
  CharacterLimit: any;
}

export default class ZogenixCardsWebPart extends BaseClientSideWebPart<IZogenixCardsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IZogenixCardsProps> = React.createElement(
      ZogenixCards,
      {
        description: this.properties.description,
        ImgUrl: this.properties.ImgUrl,
        Title: this.properties.Title,
        RedirectionUrl: this.properties.RedirectionUrl,
        DescriptionPara: this.properties.DescriptionPara,
        CharacterLimit: this.properties.CharacterLimit,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("ImgUrl", {
                  label: "Image URL",
                }),
                PropertyPaneTextField("Title", {
                  label: "Title",
                }),
                PropertyPaneTextField("RedirectionUrl", {
                  label: "Redirection Url",
                }),
                PropertyPaneTextField("DescriptionPara", {
                  label: "Text",
                  multiline: true,
                }),
                PropertyPaneTextField("CharacterLimit", {
                  label: "Character Limit",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
