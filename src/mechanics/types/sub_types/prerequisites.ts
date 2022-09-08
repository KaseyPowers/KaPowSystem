import { MakeKeyOptional } from "../../../utils";
/** The Main Type Definitions */

/** 
 * These are likely to change, but used to flag if the array requires all prerequisits listed, or at least one of them
 * Using the array function names for simplicity, the string value will be used when displaying
*/
export enum PrerequisiteComparison {
    some = "One Of",
    every = "All Of"
};

/** base type, just the id of the element required */
export type PrerequisiteElement = string;
/** Tuple representing a requirement for an element at a certain rank */
export type PrerequisiteRank = [PrerequisiteElement, number];

export type PrerequisiteOption = PrerequisiteElement | PrerequisiteRank;

export interface PrerequisiteObj {
    /** 
     * optional id for finding specific obj later
     * Ex. A weapon feat that applies to multiple categories, letting the proficiency ranks define what level they get that feat in the definitions 
    */
    id?: string,
    comparison: PrerequisiteComparison,
    options: PrerequisiteOption[]
};

// the final structure is the same as the Obj, but options is an array of objects
export interface Prerequisites {
    comparison: PrerequisiteComparison,
    options: PrerequisiteObj[];
}

/** Simple Input converters for sub-types reusable  */

export type PrerequisiteObjDefinition = MakeKeyOptional<PrerequisiteObj, "comparison">;
export function getPrerequisiteObj(input: PrerequisiteObjDefinition): Readonly<PrerequisiteObj> {
    return {
        comparison: PrerequisiteComparison.every,
        ...input
    };
}

export type PrerequisitsDefinition = MakeKeyOptional<Prerequisites, "comparison">;
export function getPrerequisites(input: PrerequisitsDefinition): Readonly<Prerequisites> {
    return {
        comparison: PrerequisiteComparison.some,
        ...input
    };
}