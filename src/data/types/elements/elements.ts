import { BaseObject } from "../shared";
import { PartialRequired } from "../utils";

import { Element_Types } from "./element_types";
import { Requirements } from "./requirements";
/**
 * Start with basic structure, split to new files as needed
 *
 * TODO: Determine if Entities are a type of Element or not
 */

/**
 * Tags are simple identifiers added to elements, a variety of uses but often used for requirements or referenced when elements have effects on other elements
 * Creating a Tag interface to add to as we add to them */
export interface Tag extends BaseObject {}

/**
 * the type definition for describing an element, splitting here to make it easier to update as we improve
 * NOTE: Will work on a syntax for strings to reference elements in descriptions, so that modified elements will get propogated.
 *  Ex. Changing the name of an attribute for a modded game, can keep the original ID but update the name in text that references it.
 */
export type ElementDescription = string;

export interface Element extends BaseObject {
  type: Element_Types;
  tags: Tag[];

  // Optional Description for flavor text
  description?: ElementDescription;

  // Define the requirements if they exist, prerequisits before an element can added/baught/used
  requirements?: Requirements;

  /** All other aspects of an element, TBD if we leave optional or just add to specific type elements */

  // TODO: cost structure, could refer to entities exp/points, or currency for items, etc.
  cost?: any;

  // TODO: determine terms and structure for tracking the value/level/rank of an element

  /**
   *
   * level: number,
   * score: number,
   *
   * Slot+Options structure TBD
   * slots: { [id]: Element },
   * options: Element[]
   *
   * rules: a potential way to define structure for how elements interact, needed for these elements to effect gameplay if dice rolls and such are done in browser
   */
}

export interface DefinitionElement
  extends PartialRequired<Element, "description"> {
  type: Element_Types.Definition;
}

export interface AttributeElement extends Element {
  type: Element_Types.Attribute;
  /** shorthand/abbreviation for simplicity, only used for attribute's modifier math displays. Ex. Strength = STR */
  shorthand: string;
}
