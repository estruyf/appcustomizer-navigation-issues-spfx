import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { Guid } from "@microsoft/sp-core-library";

export interface IHeaderProps {
  context: ApplicationCustomizerContext;
  listId: Guid | null;
  itemId: number | null;
}
