import * as React from 'react';
import styles from './Header.module.scss';
import { IHeaderProps, IHeaderState } from '.';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { UserManager } from '../../services/UserManager';

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  private userManager: UserManager;

  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
      panelOpen: false
    };

    // Initialize service
    this.userManager = UserManager.init(this.props.context);
  }

  public componentDidUpdate(prevProps: IHeaderProps): void {
    if (prevProps.listId !== this.props.listId ||
        prevProps.itemId !== this.props.itemId) {
      this.setState({
        panelOpen: false
      });
    }
  }

  public componentWillUnmount() {
    console.log('Unmounting the header component.');
    this.userManager.dispose();
  }

  private openPanel = () => {
    this.setState({
      panelOpen: true
    });
  }

  private closePanel = () => {
    this.setState({
      panelOpen: false
    });
  }

  public render(): React.ReactElement<IHeaderProps> {
    return (
      <div className={ styles.header }>
        <span>Hello {this.userManager.getUserDisplayName()}</span>

        <span>/</span>

        <span>Running on:{this.props.context.pageContext.legacyPageContext.serverRequestPath}</span>

        <span>/</span>

        <Link onClick={this.openPanel}>Open the panel</Link>.

        <Panel isOpen={this.state.panelOpen}
               onDismiss={this.closePanel}
               isLightDismiss={true}
               headerText="Just a demo panel"
               closeButtonAriaLabel="Close">
          This is just some content for the panel.

          <p><Link href="https://estruyfdev2.sharepoint.com/sites/ValoPageTemplates/SitePages/test-4.aspx">No app customizer</Link></p>
          <p><Link href="https://estruyfdev2.sharepoint.com/sites/NavigationTestIssue/SitePages/New-test-page.aspx">With the app customizer</Link></p>
          <p><Link href="https://estruyfdev2.sharepoint.com/sites/NavigationTestIssue/sitepages/home.aspx">🔙</Link></p>
        </Panel>
      </div>
    );
  }
}
