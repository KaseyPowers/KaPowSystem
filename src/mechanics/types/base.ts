
import { GameplayWeights, ModifierOptions, Prerequisites } from "./sub_types";

/** The Basic structure for everything (pre-attribute) Most will build off of later Bases though */
export interface BaseElement {
    /** Unique identifier, ideally unique for all definitions, minimum unique to the group it's in */
    id: string,
    /** The full diaply name for the object */
    name: string,
    /** Base type to help narrow down the full list, ex. "Attribute", "Skill", etc. */
    type: string,
    /** Descriptive tags, optional, will have uses for feats as well as items+proficiencies */
    tags?: string[],
    /** Optional abbreviation for quick references aka: Strength + STR */
    shorthand?: string,
    /** Full length description optional for now, but eventually should be required, might also support markdown for link references */
    description?: string,
    /** 
    * A number value for most elements (optional for the rest)
    * name might change to find a best fit
    * Uses:
    * Ability Score
    * Skill Rank/Level
    * Etc.
    */
    level?: number
}


/** Element adds to the BaseDefinition the weight/mods that the element uses. */
export interface BaseGameplayElement
    extends BaseElement {
    /** gameplayWeight is a balancing value to measure how much the element impacts certain aspects of the game. The end result to keep attributes/etc. from being too powerful in one area or another */
    gameplayWeight: GameplayWeights,
    /** mods track the sub-values that add up for this one.  ex. HP = <> + Willpower + Stamina */
    mods: ModifierOptions,
}

// catch all for types we are figuring out
// type TODO = any;

/** Name TBD: these are items that have pre-requisits that much be met before they can be added to a character. Ex. Feats/Abilities/Etc. */
export interface BaseUnlockableElement extends BaseGameplayElement {
    prerequisites: Prerequisites
};