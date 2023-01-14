import { CommonObj } from "./shared";
import { Tag } from "./tag";
import { Modifiers } from "./modifiers";
import { PartialRequired, ObjectValues } from "../utils"

/**
 * An Element (or Gameplay Element) is a building block of the game, making up parts of everything from what defines a person and what they can do in our game, or as simple as definitions of a simple stick as a weapon.
 */
export const ELEMENT_CATEGORIES = {
    /** These elements are used to define things like element types */
    DEFINITION: "Definition",
    /** Class defines all the types of classes and what they add to a character */
    CLASS: "Class",
    /** Foundational Elements that numerically represent a natural aptitude and potential in various aspects. */
    ATTRIBUTE: "Attribute",
    /** Stat - Could have a better name, basics that are derived from attributes but can't be leveled up */
    STAT: "Stat",
    /** Base Elements that represent more specific tasks than attributes, with levels/ranks representing effort put in to improve these skills over time, with study, practice, training and muscle memory. */
    SKILL: "Skill",
    /**  A level/rank modifier representing proficiency with specific items or categories of items  */
    PROFICIENCY: "Proficiency",
    /** Actions are things a character can do */
    ACTION: "Action",
    /** A stance represents some sort of posture that helps with certain actions or has various pros/cons.  */
    STANCE: "Stance",
    /** Crafting Element represents the ability to craft certain things, either new types of crafting, or being better at making certain things  */
    CRAFTING: "Crafting",
    /** A Bonus adds something to a character, as simple as adding a new proficiency, to complex like granting advantage to a skill check in certain situations */
    BONUS: "Bonus",
    ITEM: "Item",
    /** NOTE: more types will be added as they come up */
    /** Filler types */
    /** Misc is a catch all for things that don't fit in other types yet */
    MISC: "Misc",
    /** used for a planned type that hasn't been added yet */
    TODO: "TODO"
} as const;

export type ElementCategoryType = ObjectValues<typeof ELEMENT_CATEGORIES>;

export interface Element extends CommonObj {
    /** Description for longer flavor text */
    description?: string | string[],
    /** 
     * The type of element, used for UI of each element card, as well as grouping, and some basic rules/restrictions
     * Examples: Attribute, Stat, Skill, Proficiency, Items, Action
     */
    type: ElementCategoryType,
    tags: Tag[],
    /** this tag flag indicates this definition applies to a tag (for linking if needed) */
    definesTag?: boolean
}


export interface DefinitionElement extends PartialRequired<Element, "description" | "definesTag"> {
    type: typeof ELEMENT_CATEGORIES.DEFINITION,
}

export interface AttributeElement extends Element {
    type: typeof ELEMENT_CATEGORIES.ATTRIBUTE,
    /** shorthand/abbreviation for simplicity, only used for attribute's modifier math displays. Ex. Strength = STR */
    shorthand: string,
}

export interface ItemElement extends Element {
    type: typeof ELEMENT_CATEGORIES.ITEM,
    /** TODO: Cost options for items, but number to show it's destinct from other types  */
    cost: number,
}

export interface ModifiersElement extends Element {
    modifiers: Modifiers
};

export interface StatElement extends ModifiersElement {
    type: typeof ELEMENT_CATEGORIES.STAT
};

type SpecifiedElementCategories = DefinitionElement["type"] | AttributeElement["type"] | ItemElement["type"] | StatElement["type"];

/** For elements that can be added and aren't default to the base character. (While Items are similar, they aren't in this category) */
export interface AddableElement extends Element {
    /** Limiting the categories available for addable elements */
    type: Exclude<ElementCategoryType, SpecifiedElementCategories>,
    /** Using cost in case we have point-buy setup with more variations than free or not-free options */
    cost: boolean,
    /** 
     * Prerequisits are limitations to an element that prevent it from being added, applied before cost. If the prerequisits are later unmet (ex. a condition lowering an attribute value temporarily) the element won't be removed but it will not be available to use, much like a conditional requirement
     * TODO: the type/interface used for prerequisits. Should include options for values that can be displayed like tags, like class based ones.
     */
    prerequisites?: string[]
    /** 
     * While prerequisites are based on if the element can be done at all, reqirements determine if the element can be applied situationally. Ex. being in a certain stance, positioning to target, etc.
     * NOTE: Requirements are not a used for now, will assume they are in the description type section until it's determined they are needed. 
     */

    /** NOTE: Prerequisites and Requirements often overlap, and those overlaps don't always need to be explicetly stated in quick referenced views. Traits referring to exclusivity of that element are treated as prerequisits by default. Requirements are more likely to need clarification, such as requiring a certain weapon equipped would imply a prerequisit of being able to use that weapon at all, but could also be clarified if it requires a specific level of proficiency with that weapon. */
}

export interface SkillElement extends AddableElement, ModifiersElement {
    type: typeof ELEMENT_CATEGORIES.SKILL
}

/** Proficiency works like skills but will always need to be added by something */
export interface ProficiencyElement extends AddableElement, ModifiersElement {
    type: typeof ELEMENT_CATEGORIES.PROFICIENCY,
    cost: true
}

/** TODO: action element logic */
export interface ActionElement extends AddableElement {
    type: typeof ELEMENT_CATEGORIES.ACTION,
}
export interface CraftingElement extends AddableElement {
    type: typeof ELEMENT_CATEGORIES.CRAFTING,
}
export interface StanceElement extends AddableElement {
    type: typeof ELEMENT_CATEGORIES.STANCE,
}