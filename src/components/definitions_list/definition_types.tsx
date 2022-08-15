import type React from "react";

export interface IDefinitionItem {
  id: React.Key;
  primary: string;
  secondary?: string;
  caption?: string;
  definition?: string;
}

export interface IDefinitionGroup {
  id: React.Key;
  /** String label optional, will use id by default, but in case they need to be made more readable */
  label?: string;
  items: IDefinitionItem[];
}

export type DefinitionDataItem = IDefinitionGroup | IDefinitionItem;

export enum GroupStyleTypes {
  divider = "divider",
  collapse = "collapse",
}

export interface DescriptionItemOptions {
  showItemDefinitions: boolean;
}

export interface DefinitionListOptions extends DescriptionItemOptions {
  groupStyle: GroupStyleTypes;
}
