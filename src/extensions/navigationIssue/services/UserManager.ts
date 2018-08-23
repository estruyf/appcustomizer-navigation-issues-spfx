import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { SPUser } from "@microsoft/sp-page-context";


export class UserManager {
  private static instance: UserManager;

  private constructor (public context: ApplicationCustomizerContext) {}

  /**
   * Initialize the class
   *
   * @param context
   */
  public static init(context?: ApplicationCustomizerContext) {
    // Create a new instance when it doesn't exist or when context is undefined
    if (!UserManager.instance) {
      UserManager.instance = new UserManager(context);
    }
    return UserManager.instance;
  }

  public dispose() {
    UserManager.instance = null;
  }

  public getUserDisplayName() {
    return this.context.pageContext.user.displayName;
  }
}
