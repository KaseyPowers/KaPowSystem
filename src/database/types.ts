import { ObjectValues } from "../utils";
/**
 * An Element (or Gameplay Element) is a building block of the game, making up parts of everything from what defines a person and what they can do in our game, or as simple as definitions of a simple stick as a weapon.
 */
export const ELEMENT_TYPES = {
    /** These elements are used to define things like element types */
    DEFINITION: "definition",
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
    ITEM: "item",
    /** NOTE: more types will be added as they come up */
    /** Filler types */
    /** Misc is a catch all for things that don't fit in other types yet */
    MISC: "Misc",
    /** used for a planned type that hasn't been added yet */
    TODO: "TODO"
} as const;

export type ElementType = ObjectValues<typeof ELEMENT_TYPES>;

export interface Element<T extends void | string = void> {
    /** Unique identifier, ideally unique for all elements, minimum unique to the group it's in */
    id: string,
    /** The diaply name for the element */
    name: string,
    /** Optional shorthand/abbreviation for simplicity, expecially in modifier math displays. Ex. Strength = STR */
    shorthand?: string,
    /** Description for longer flavor text */
    description?: string,
    /** 
     * The type of element, used for UI of each element card, as well as grouping, and some basic rules/restrictions
     * Examples: Attribute, Stat, Skill, Proficiency, Items, Action
     */
    type: T extends void ? ElementType : [ElementType, T],

    /** tags are flexible attributes of an element, used to indicate types of actions, or categories of more general type. ex. a weapon would use tags to indicate the different qualities it might have */
    tags?: string[],
}

// export interface SkillElement extends Element {
//     elementType: ElementType.skill,
//     /** An optional string for tracking derivative skills, ex. knowledge/lore and it's fields */
//     subtypes?: string[]
// }

export interface AddableElement extends Element {
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

/** Special Element interface for physical items */
export interface ItemElement extends Element {

}