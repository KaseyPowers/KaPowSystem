import { ObjectValues } from "../../utils";
import { ELEMENT_TYPES, Element } from "../types";

/** 
 * The main 3 aspects that make up a person
 * NOTE: might use lesser/modified versions for things like vehicles having physical attributes
 * 
 * optional types are
 * Physical/Mental/Social
 * Mind/Body/Soul
 */
export const CHARACTERISTIC_TYPES = {
    PHYSICAL: "Physical",
    MENTAL: "Mental",
    SOCIAL: "Social"
} as const;

export type CharacteristicType = ObjectValues<typeof CHARACTERISTIC_TYPES>;

/** Expecting this to be extended again, so adding another generic layer */
type CharacteristicElementType = Element<CharacteristicType>;
export interface CharacteristicElement<T extends void | string = void> extends Omit<CharacteristicElementType, "type"> {
    type: T extends void ? CharacteristicElementType["type"] : [...CharacteristicElementType["type"], T],
}

export const characteristicElementDefinitions: Element[] = [
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: "physical",
        name: CHARACTERISTIC_TYPES.PHYSICAL,
        description: "Physical characteristics represent how one interacts with the world",
    },
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: "mental",
        name: CHARACTERISTIC_TYPES.MENTAL,
        description: "Mental characteristics represent how one understands the world",
    },
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: "social",
        name: CHARACTERISTIC_TYPES.SOCIAL,
        description: "Social characteristics represent how one interacts with and understands others in the world",
    }
];