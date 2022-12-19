import { ObjectValues } from "../../../utils";
import { CharacteristicElement } from "../types";

export const ATTRIBUTE_TYPES = {
    /** Power is used for applying the strength of a characterstic type */
    POWER: "Power",
    /** Where power might go through something, Adapting is what goes around it */
    ADAPTABILITY: "Adaptability",
    /** Awareness is used for taking in infomation and understanding it */
    AWARENESS: "Awareness",
    /** Resilience represents the toughness of that character type, between shrugging off pain or having it bounce off you. */
    RESILIENCE: "Resilience",
} as const;
export type AttributeType = ObjectValues<typeof ATTRIBUTE_TYPES>;

// export interface AttributeElement extends CharacteristicElement<AttributeType> { };
export type AttributeElement = CharacteristicElement<AttributeType>;