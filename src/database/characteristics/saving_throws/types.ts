import { ObjectValues } from "../../../utils";
import { CharacteristicElement } from "../types";

/** Saving throws are used when a problem is presented with an opportunity to handle it. */
export const SAVINGTHROW_TYPES = {
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

export type SavingThrowType = ObjectValues<typeof SAVINGTHROW_TYPES>;


// export interface SavingThrowElement extends CharacteristicElement<AttributeType> { };
export type SavingThrowElement = CharacteristicElement<SavingThrowType>;

