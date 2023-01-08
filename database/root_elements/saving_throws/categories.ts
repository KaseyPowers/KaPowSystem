import { ObjectValues } from "../../utils";
import { DefinitionInput, getDefinitions } from "../../types";

/** Saving throws are used when a problem is presented with an opportunity to handle it. */
export const SAVINGTHROW_CATEGORIES = {
    /** 
     * Evade is used to get out of the way of the problem
     * Awareness + adapt
     */
    EVADE: "Evade",
    /** 
     * Evade is used to power through or resist the effects of a problem
     * Power + Resilience
     */
    ENDURE: "Endure"
} as const;

export type SavingThrowCategoryType = ObjectValues<typeof SAVINGTHROW_CATEGORIES>;

const rawDefinitions: DefinitionInput[] = [
    {
        id: "saving_throws",
        name: "Saving Throw",
        description: "Saving throws are done when confronted with a problem and there is an opportunity to lessen it's impact",
        definesTag: false,
    },
    {
        name: SAVINGTHROW_CATEGORIES.EVADE,
        description: "Evasion saving throws are used to work around a problem, using a combination of awareness and adaptability."
    },
    {
        name: SAVINGTHROW_CATEGORIES.ENDURE,
        description: "Enduring saving throws are used when working through/against a problem directly, using a combination of power and resilience",
    }
];

const { elements, tags } = getDefinitions(rawDefinitions);


export const savingThrowDefinitions = elements;
export const savingThrowTags = tags;