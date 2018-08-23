import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';

import * as strings from 'NavigationIssueApplicationCustomizerStrings';
import { IHeaderProps, Header } from './components/header';

const LOG_SOURCE: string = 'NavigationIssueApplicationCustomizer';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NavigationIssueApplicationCustomizer extends BaseApplicationCustomizer<{}> {
  private static headerPlaceholder: PlaceholderContent;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.application.navigatedEvent.add(this, () => {
      this.startReactRender();
    });

    this.render();

    return Promise.resolve();
  }

  public onDispose() {
    if (NavigationIssueApplicationCustomizer.headerPlaceholder && NavigationIssueApplicationCustomizer.headerPlaceholder.domElement){
      ReactDom.unmountComponentAtNode(NavigationIssueApplicationCustomizer.headerPlaceholder.domElement);
    }
  }

  private render() {
    if (this.context.placeholderProvider.placeholderNames.indexOf(PlaceholderName.Top) !== -1) {
      if (!NavigationIssueApplicationCustomizer.headerPlaceholder || !NavigationIssueApplicationCustomizer.headerPlaceholder.domElement) {
        NavigationIssueApplicationCustomizer.headerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {
          onDispose: this.onDispose
        });
      }

      this.startReactRender();
    } else {
      console.log(`The following placeholder names are available`, this.context.placeholderProvider.placeholderNames);
    }
  }

  /**
   * Start the React rendering of your components
   */
  private startReactRender() {
    if (NavigationIssueApplicationCustomizer.headerPlaceholder && NavigationIssueApplicationCustomizer.headerPlaceholder.domElement) {
      const element: React.ReactElement<IHeaderProps> = React.createElement(Header, {
        context: this.context,
        listId: this.context.pageContext.list && this.context.pageContext.list.id ? this.context.pageContext.list.id : null,
        itemId: this.context.pageContext.listItem && this.context.pageContext.listItem.id ? this.context.pageContext.listItem.id : null
      });
      ReactDom.render(element, NavigationIssueApplicationCustomizer.headerPlaceholder.domElement);
    } else {
      console.log('DOM element of the header is undefined. Start to re-render.');
      this.render();
    }
  }
}
